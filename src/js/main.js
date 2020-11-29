// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
import imageListTemplate from "../templates/images-list.hbs" ;
import imagesService from "./images-service.js" ;





const galleryListEL= document.querySelector('.gallery') ;
const inputEl= document.querySelector('#search-form') ;
const loadMoreBtn= document.querySelector('.load-more-button') ;



inputEl.addEventListener('submit', searchImages);

function searchImages(e){
    e.preventDefault();
     const form = e.currentTarget;

    imagesService.query = form.elements.query.value;
    
   imagesService.resetPage();
    galleryListEL.innerHTML = '' ;
    form.reset() ;

    imagesService.fetchApi().then(hits => {
        renderImageCard(hits);
      
        
    });
}

loadMoreBtn.addEventListener('click', loadMoreImages) ;
function loadMoreImages(){
    imagesService.fetchApi().then(hits => {
        renderImageCard(hits);
       
        
    });

}







function renderImageCard(hits){
    const markup = imageListTemplate(hits);

    galleryListEL.insertAdjacentHTML('beforeend', markup)
}