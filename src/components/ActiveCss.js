





const setActiveClass = (e) => {
    // console.log("target, parentNode, parentNode's parentNode :", e.target, e.target.parentNode, e.target.parentNode.parentNode);
    var event;
    if (e.target.classList.contains('navlink')){
        event = e.target;
        event.classList.add('active');
        console.log("target");
    }
    else if(e.target.parentNode.classList.contains('navlink')){
        event = e.target.parentNode;
        event.classList.add('active');
        console.log("parent");
    }
    else if(e.target.parentNode.parentNode.classList.contains('navlink')){
        event = e.target.parentNode.parentNode;
        event.classList.add('active');
        console.log("parent's parent");
    }
    
    var links = document.querySelectorAll('.navlink');

    for (var i = 0; i < links.length; i++){
        if(links[i] === event) {
            continue;
        };
        links[i].classList.remove('active');
    }
    // console.log("links :", links);
};


export default setActiveClass