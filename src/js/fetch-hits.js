const apiKey = '19312346-1618d264863fa21be7207d71c' ;

function fetchApi(searchQuery , page = 1){
    
    const url = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal' ;
  
    return fetch(`${url}&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`)
    .then(response=>response.json()).then(data => data.hits)
    
}

export default fetchApi ;