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
/*
	var tag_popup_div = document.querySelector('.tag-hint menu menu_vertical menu_padding_none')
	if (tag_popup_div){
		var newDiv = document.createElement("div");
		newDiv.class='menu__item';
		newDiv.innerHTML = 'Заблюрить тег';
		tag_popup_div.append(newDiv);
		//document.getElementById(tag).addEventListener("click",del_tag);
	}
	*/
	//if (document.readyState === "complete") {
		try {
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
			
		} catch (e) {
			console.log("Error in blur_jest()")
			console.log(e)
		}
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
	var init_tag_list
	chrome.storage.local.get("tagslist", function (data) {
		if (data.tagslist != null) {
			document.getElementById("add_tags_list_text").value = data.tagslist;
			init_tag_list = data.tagslist;
		} else {			
			chrome.storage.local.set({tagslist: 'Жесть,NSFW'});
			document.getElementById("add_tags_list_text").value='Жесть,NSFW';			
			init_tag_list = 'Жесть,NSFW';
		}
		if (init_tag_list.substr(init_tag_list.length-1,1)==','){
			init_tag_list=init_tag_list.substr(0,init_tag_list.length-1);
			chrome.storage.local.set({tagslist: init_tag_list});
		}
		my_div = document.getElementById("TagsList");
		while(my_div.firstChild){
			my_div.removeChild(my_div.firstChild);
		}
		for (let tag of init_tag_list.split(',')){
			var newLi = document.createElement("li");
			newLi.id='liid-'+tag;
			newLi.innerHTML = tag+'<img src="del_btn.png" class="del_pic" id="'+tag+'" height="16" width="16" >';
			my_div.append(newLi);
			document.getElementById(tag).addEventListener("click",del_tag);
			
		}
		if (document.getElementById("add_tags_list_btn")) {
			document.getElementById("add_tags_list_btn").addEventListener("click",click_tags_btn);	
			document.getElementById('blur_range').addEventListener("mousemove",on_change_blur_size);
			document.getElementById("pic").addEventListener("mouseover",on_mouseover_blur);
			document.getElementById("pic").addEventListener("mouseout",on_mouseout_blur);
			document.getElementById("add_pic").addEventListener("click",add_tag);
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
			document.getElementById("add_pic").addEventListener("click",add_tag);
		}
	});
	
}

function del_tag(event){	
	chrome.storage.local.get("tagslist", function (data) {
		if (data.tagslist != null) {
			if (data.tagslist) {
				init_tag_list = data.tagslist;				
				if (event.target.id.toLowerCase() == data.tagslist.toLowerCase().split(',')[0]) {
					var replace_str=event.target.id+','
				} else {
					if (event.target.id.toLowerCase() == 'new_tag'){
						var replace_str=''
					} else {
					var replace_str=','+event.target.id
					}
				}
				chrome.storage.local.set({tagslist: init_tag_list.replace(replace_str,'')});			
			}
		}
		chrome.storage.local.get("tagslist", function (data) {
			if (data.tagslist != null) {
				document.getElementById("add_tags_list_text").value = data.tagslist;
				init_tag_list = data.tagslist;
			} else {			
				chrome.storage.local.set({tagslist: 'Жесть,NSFW'});
				document.getElementById("add_tags_list_text").value='Жесть,NSFW';			
				init_tag_list = 'Жесть,NSFW';
			}
			my_div = document.getElementById("TagsList");
			while(my_div.firstChild){
				my_div.removeChild(my_div.firstChild);
			}
			for (let tag of init_tag_list.split(',')){
				var newLi = document.createElement("li");
				newLi.innerHTML = tag+'<img src="del_btn.png" class="del_pic" id="'+tag+'" height="16" width="16" >';
				my_div.append(newLi);
				document.getElementById(tag).addEventListener("click",del_tag);			
			}
		});
	});
	
}

function add_tag(event){
	chrome.storage.local.get("tagslist", function (data) {
		if (data.tagslist != null) {
			document.getElementById("add_tags_list_text").value = data.tagslist;
			init_tag_list = data.tagslist;
		} else {
			chrome.storage.local.set({tagslist: 'Жесть,NSFW'});
			document.getElementById("add_tags_list_text").value='Жесть,NSFW';			
			init_tag_list = 'Жесть,NSFW';
		}
		my_div = document.getElementById("TagsList");	
		while(my_div.firstChild){
			my_div.removeChild(my_div.firstChild);
		}
		for (let tag of init_tag_list.split(',')){
			var newLi = document.createElement("li");
			newLi.innerHTML = tag+'<img src="del_btn.png" class="del_pic" id="'+tag+'" height="16" width="16" >';
			my_div.append(newLi);
			document.getElementById(tag).addEventListener("click",del_tag);				
		}	
		var newIn = document.createElement("input");
		newIn.type ='text';
		newIn.id='add_new_tag';
		newIn.name='save';
		newIn.placeholder='Введите теги через запятую';		
		my_div.append(newIn);
		document.getElementById("Add_btn_div").removeChild(document.getElementById("add_pic"));		
		document.getElementById('add_new_tag').classList.add('b-show-new-tag');
		document.getElementById('add_new_tag').addEventListener("keyup",enter_key);
		document.getElementById('add_new_tag').focus();
		
	});
}

function enter_key(event){
	if (event.keyCode === 13) { //enter
		click_tags_btn(event);
	}
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
	//chrome.storage.local.set({tagslist: document.getElementById("add_tags_list_text").value});
	chrome.storage.local.set({blur_size: document.getElementById("blur_range").value});
	chrome.storage.local.get("tagslist", function (data) {
		console.log(data.tagslist)
		if (document.getElementById("add_new_tag") === null){
			var new_tag_list = data.tagslist
		} else {
			if (document.getElementById("add_new_tag").value != ''){
				var new_tag_list = data.tagslist+','+document.getElementById("add_new_tag").value;
			} else {
				var new_tag_list = data.tagslist
			}
			
		}
		
		if (document.getElementById("add_new_tag")){
			my_div = document.getElementById("TagsList");	
			my_div.removeChild(document.getElementById("add_new_tag"));		
		}
		chrome.storage.local.set({tagslist: new_tag_list});		
		while(my_div.firstChild){
			my_div.removeChild(my_div.firstChild);
		}
		for (let tag of new_tag_list.split(',')){
			var newLi = document.createElement("li");
			newLi.innerHTML = tag+'<img src="del_btn.png" class="del_pic" id="'+tag+'" height="16" width="16" >';
			my_div.append(newLi);
			document.getElementById(tag).addEventListener("click",del_tag);			
		}
	});
	chrome.storage.local.get("blur_size", function (data) {
		console.log(data.blur_size)
		document.getElementById("blur_range").value = data.blur_size;
	});
	if (!document.getElementById("add_pic")){
		my_div = document.getElementById("Add_btn_div");
		var newImg = document.createElement("img")
		newImg.id="add_pic";
		newImg.src="add_btn.png";
		newImg.class="add_pic";
		newImg.width='32';
		newImg.height="32";
		newImg.style.cssText = 'block:none;';
		my_div.append(newImg);
		document.getElementById("add_pic").addEventListener("click",add_tag);
		document.getElementById("add_pic").classList.add('b-show-add');
		//.classList.add('b-show');
		
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
	//event.target.closest(".story__main").querySelector('.story__content-inner').setAttribute("style", s)
	//event.target.closest(".story__main").querySelector('.story__content-inner').style.cssText = s;
	notinpost=true;
	blur_jest()
}
