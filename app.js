let notinpost = true
let s = "Filter: blur(25px);"
let ns = "Filter: blur(30px);"
//let parent_tag_Element = tag_element.closest(".story__main").data('id')
//let tag_name = tag_element.getAttribute("data-tag").name
blur_jest()
document.addEventListener("DOMContentLoaded",blur_jest())
document.body.querySelector('.app__inner').addEventListener("mousemove",on_click);


function blur_jest() {
	//alert("ters")
	if (notinpost) { 
		var tags_elements = document.getElementsByClassName('tags__tag'); // ссылка на пост с тего жесть 
		var tags_nswf_elem = document.getElementsByClassName('tags__tag tags__tag_nsfw'); // ссылка на пост с тего жесть 
		for (let tag of tags_elements) {
			if ((tag.target) && ((tag.textContent == "Жесть"))) {
						
					tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", s);
					tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = s;
					tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseover",on_mouseover);
					tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseout",on_mouseout);
				
			}
			
		}
		for (let tag of tags_nswf_elem) {
			if ((tag.target) && ((tag.textContent == "NSFW"))) {
						
					tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", ns);
					tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = ns;
					tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseover",on_mouseover);
					tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseout",on_mouseout);
				
			}
			
		}
	}
}

function on_click(event){
	blur_jest()
}

function on_mouseover(event){
	event.target.closest(".story__main").querySelector('.story__content-inner').removeAttribute("style");
	notinpost=false
}

function on_mouseout(event){
	event.target.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", s)
	event.target.closest(".story__main").querySelector('.story__content-inner').style.cssText = s;
	notinpost=true
}
