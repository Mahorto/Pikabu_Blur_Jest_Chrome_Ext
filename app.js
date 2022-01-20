let notinpost = true
let s = "Filter: blur(25px);"
let ns = "Filter: blur(30px);"
var sty_img = "Filter: blur(%size%px);"

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
	var sty = "Filter: blur(%size%px);"
	
	//if (document.readyState === "complete") {
		//try {
			chrome.storage.local.get("tagslist", function (data) {	
				if (data.tagslist) {
					tags_array = data.tagslist.toLowerCase().split(',');							
				} else {
					tags_array = 'Жесть,NSFW'.split(',');
				}
				chrome.storage.local.get("blur_size", function (data) {
					console.log(data.blur_size)
					if (data.blur_size) {
						sty=sty.replace(/%size%/i,data.blur_size)
					} else {
						sty=sty.replace(/%size%/i,'30')
					}
					blur_post(tags_array,sty)
				});				
			});
			/*
		} catch (e) {
			console.log("Error in blur_jest()")
			console.log(e)
		}*/
	//}
}

function blur_post(tags_array_f,sty_f){
	if (notinpost) { 
			var tags_elements = document.getElementsByClassName('tags__tag'); // ссылка на пост с тего жесть 
			var tags_nswf_elem = document.getElementsByClassName('tags__tag tags__tag_nsfw'); // ссылка на пост с тего жесть 
			for (let tag of tags_elements) {
				
				if ((tag.target) && ((tags_array_f.indexOf(tag.textContent.toLowerCase()) != -1))) {
							
						tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", sty_f);
						tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = sty_f;
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseover",on_mouseover);
						tag.closest(".story__main").querySelector('.story__content-inner').addEventListener("mouseout",on_mouseout);
					
				}
				
			}
			for (let tag of tags_nswf_elem) {
				
				if ((tag.target) && ((tags_array_f.indexOf(tag.textContent.toLowerCase()) != -1))) {
							
						tag.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", sty_f);
						tag.closest(".story__main").querySelector('.story__content-inner').style.cssText = sty_f;
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
		} else {			
			chrome.storage.local.set({tagslist: 'Жесть,NSFW'});
			document.getElementById("add_tags_list_text").value='Жесть,NSFW';
		}
		if (document.getElementById("add_tags_list_btn")) {
			document.getElementById("add_tags_list_btn").addEventListener("click",click_tags_btn);	
			document.getElementById('blur_range').addEventListener("mousemove",on_change_blur_size);
			document.getElementById("pic").addEventListener("mouseover",on_mouseover_blur);
			document.getElementById("pic").addEventListener("mouseout",on_mouseout_blur);
		}
	});
	chrome.storage.local.get("blur_size", function (data) {
		img = document.getElementById("pic");
		if (data.blur_size != null) {
			document.getElementById("blur_range").value = data.blur_size;
			size = document.getElementById("blur_range").value;
			img.setAttribute("style", sty_img.replace(/%size%/i,size));
			img.style.cssText = sty_img.replace(/%size%/i,size);
		} else {			
			chrome.storage.local.set({blur_size: '30'});
			document.getElementById("blur_range").value = 30;
			size = document.getElementById("blur_range").value;
			img.setAttribute("style", sty_img.replace(/%size%/i,size));
			img.style.cssText = sty_img.replace(/%size%/i,size);
		}
		if (document.getElementById("add_tags_list_btn")) {
			document.getElementById("add_tags_list_btn").addEventListener("click",click_tags_btn);	
			document.getElementById('blur_range').addEventListener("mousemove",on_change_blur_size);
			document.getElementById("pic").addEventListener("mouseover",on_mouseover_blur);
			document.getElementById("pic").addEventListener("mouseout",on_mouseout_blur);
		}
	});
	
}

function on_change_blur_size(event){
    size = document.getElementById("blur_range").value;
    img = document.getElementById("pic");
	img.setAttribute("style", sty_img.replace(/%size%/i,size));
	img.style.cssText = sty_img.replace(/%size%/i,size);
}

function on_mouseover_blur(event){
	document.getElementById("pic").removeAttribute("style");
}

function on_mouseout_blur(event){
	document.getElementById("pic").setAttribute("style", sty_img.replace(/%size%/i,size))
	document.getElementById("pic").style.cssText = sty_img.replace(/%size%/i,size);
}

function click_tags_btn(event){
	console.log(document.getElementById("add_tags_list_text").value)
	console.log(document.getElementById("blur_range").value)
	chrome.storage.local.set({tagslist: document.getElementById("add_tags_list_text").value});
	chrome.storage.local.set({blur_size: document.getElementById("blur_range").value});
	chrome.storage.local.get("tagslist", function (data) {
		console.log(data.tagslist)
		document.getElementById("add_tags_list_text").value = data.tagslist;
	});
	chrome.storage.local.get("blur_size", function (data) {
		console.log(data.blur_size)
		document.getElementById("blur_range").value = data.blur_size;
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
