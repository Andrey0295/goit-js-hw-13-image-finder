// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
import imageListTemplate from "../templates/images-list.hbs" ;
import imagesService from "./images-service.js" ;
import getRefs from "./get-refs.js" ;

const refs = getRefs();




refs.inputEl.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', fetchHits) ;

function searchImages(e){
    e.preventDefault();
     const form = e.currentTarget;

    imagesService.query = form.elements.query.value;
    
   imagesService.resetPage();

   refs.galleryListEL.innerHTML = '' ;

   fetchHits();

    form.reset() ;
}



function fetchHits(){
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.spinnerEl.classList.remove('is-hidden');

    imagesService.fetchApi().then(hits => {
        renderImageCard(hits);
        refs.loadMoreBtn.classList.remove('is-hidden');

       setTimeout(() => {
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth'
        })
           
       }, 1000);

        }).catch(error=>console.log('sorry, ERROR')).finally(() =>{
            refs.spinnerEl.classList.add('is-hidden')
        });

}







function renderImageCard(hits){
    const markup = imageListTemplate(hits);

    refs.galleryListEL.insertAdjacentHTML('beforeend', markup)
}