let notinpost = true
let s = "Filter: blur(25px);"
let ns = "Filter: blur(30px);"

//let parent_tag_Element = tag_element.closest(".story__main").data('id')
//let tag_name = tag_element.getAttribute("data-tag").name
console.log(document.domain)
if (document.domain == 'pikabu.ru') {
	blur_jest()

	document.addEventListener("load",blur_jest())

	document.body.querySelector('.app__inner').addEventListener("mousemove",on_click);
} else {
		document.addEventListener("load",init_popup())
	}



function blur_jest() {	
	var tags_array = null
	if (document.readyState === "complete") {
		//try {
			chrome.storage.local.get("tagslist", function (data) {				
				if (!tags_array) {
					//chrome.storage.local.set({tagslist: 'Жесть,NSFW'})		  
					chrome.storage.local.get("tagslist", function (data) {
						tags_array = data.tagslist.toLowerCase().split(',');	
						blur_post(tags_array)
					});
				} else {
					tags_array = data.tagslist.toLowerCase().split(',');
					blur_post(tags_array)	
				}
			});
			/*
		} catch (e) {
			console.log("Error in blur_jest()")
			console.log(e)
		}*/
	}
}

function blur_post(tags_array_f){
	if (notinpost) { 
			var tags_elements = document.getElementsByClassName('tags__tag'); // ссылка на пост с тего жесть 
			var tags_nswf_elem = document.getElementsByClassName('tags__tag tags__tag_nsfw'); // ссылка на пост с тего жесть 
			for (let tag of tags_elements) {
				
				if ((tag.target) && ((tags_array_f.indexOf(tag.textContent.toLowerCase()) != -1))) {
							
						tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", s);
						tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = s;
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseover",on_mouseover);
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseout",on_mouseout);
					
				}
				
			}
			for (let tag of tags_nswf_elem) {
				
				if ((tag.target) && ((tags_array_f.indexOf(tag.textContent.toLowerCase()) != -1))) {
							
						tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", s);
						tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = s;
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseover",on_mouseover);
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseout",on_mouseout);
					
				}
				
			}
		}
}

function init_popup(event){
	
	chrome.storage.local.get("tagslist", function (data) {
		if (data.tagslist != null) {
			document.getElementById("add_tags_list_text").value = data.tagslist;
		}
		if (document.getElementById("add_tags_list_btn")) {
			document.getElementById("add_tags_list_btn").addEventListener("click",click_tags_btn);	
		}
	});
	
}

function click_tags_btn(event){
	console.log(document.getElementById("add_tags_list_text").value)
	chrome.storage.local.set({tagslist: document.getElementById("add_tags_list_text").value});
	chrome.storage.local.get("tagslist", function (data) {
		console.log(data.tagslist)
		document.getElementById("add_tags_list_text").value = data.tagslist;
	});
	
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
