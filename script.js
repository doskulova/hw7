const postsContainerEl = document.getElementById("posts-container");
const filterEl = document.getElementById ("filter");
const loaderEl = document.getElementById("loader");
let limit= 10;
let page =1;
let loaderIndicator=false;
let dataFromBack = [];
const getData = async() =>{
    const response = await fetch (`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await response.json();
    page +=1;
    dataFromBack =[...dataFromBack, ...data];
    console.log(data);
    return data;
};
const renderPost  = ({id, title, body})=>{
    return`
    <div class ="post">
    <div class ="number">${id}</div>
    <div class ="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post=body">${body}</p>
        </div>
      </div>  
    `;
}

const createHTMLTamplate =(data) =>{
    let text = data.reduce((template, element) =>( template += renderPost(element)),""
    );
    return text;
};
const renderHTMLTamplate= () =>{
    loaderIndicator =true;
    loaderEl.classList.add("show");

    getData()
    .then((posts) => {
        postsContainerEl.innerHTML += createHTMLTamplate(posts); 
    })
    .finally(() => {
        loaderIndicator = false;
        loaderEl.classList.remove("show");
    });
};
const scrollCheck =() =>{
  if(loaderIndicator){
    return;
  }
    const{scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log(scrollTop, scrollHeight, clientHeight);
    scrollTop + clientHeight >= scrollHeight && renderHTMLTamplate();
};
const searchPosts =(event) => {
    const term = event.target.value.toLowerCase();
    const filteredPosts = dataFromBack.filter(
        (el) => el.title.toLowerCase().indexOf(term) > -1 ||
        el.body.toLowerCase().indexOf(term) > -1  ||
        el.id === Number(term)
      
       
        
    );
    postsContainerEl.innerHTML = createHTMLTamplate(filteredPosts);
}


window.addEventListener("scroll",scrollCheck);
filterEl.addEventListener ("input", searchPosts );

renderHTMLTamplate();
