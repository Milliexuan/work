/* ================================================================ 
This copyright notice must be kept untouched in the stylesheet at 
all times.

The original version of this script and the associated (x)html
is available at http://www.stunicholls.com/menu/pro_drop_1.html
Copyright (c) 2005-2007 Stu Nicholls. All rights reserved.
This script and the associated (x)html may be modified in any 
way to fit your requirements.
=================================================================== */
stuHover = function () {
    var cssRule;
    var newSelector;
    //判断:当前元素是否是被筛选元素的子元素
    jQuery.fn.isChildOf = function (b) {
        return (this.parents(b).length > 0);
    };
    //判断:当前元素是否是被筛选元素的子元素或者本身
    jQuery.fn.isChildAndSelfOf = function (b) {
        return (this.closest(b).length > 0);
    };

    
    for (var i = 0; i < document.styleSheets.length; i++)
        for (var x = 0; x < document.styleSheets[i].rules.length ; x++) {
            cssRule = document.styleSheets[i].rules[x];
            if (cssRule.selectorText.indexOf("LI:hover") != -1) {
                newSelector = cssRule.selectorText.replace(/LI:hover/gi, "LI.iehover");
                document.styleSheets[i].addRule(newSelector, cssRule.style.cssText);
            }
        }
    var getElm = document.getElementById("nav").getElementsByTagName("LI");
    for (var i = 0; i < getElm.length; i++) {
        getElm[i].onmouseover = function () {
            this.className += " iehover";
            //window.event.cancelBubble = false;
        }
        getElm[i].onmouseout = function () {
            //alert(this.innerHTML);
            //document.getElementById("UserInfo").innerHTML = this.innerHTML;
            var e = e || window.event;
            var obj = e.relatedTarget || e.toElement;
            //alert(obj.innerHTML);
            //this.closest(obj);
            //alert($(obj).parents(this));
            //alert($(obj).isChildAndSelfOf(this));
            //alert(this.parent()(obj).length);
            
            if (obj == null || !$(obj).isChildAndSelfOf(this)) {
             
               //if (obj != null) document.getElementById("MidPane").innerHTML = this.innerHTML + "-------------------" + obj.innerHTML;
            // else document.getElementById("MidPane").innerHTML = this.innerHTML;
                //document.getElementById("UserInfo").innerHTML=this.innerHTML;
                // this.className = this.className.replace(new RegExp(" iehover\\b"), "");
               if (this.className.indexOf('top') > -1) this.className = 'top';
               else this.className = '';
              /// document.getElementById("MyNavBar").innerHTML = this.className;
           }
        }
    }
}
if (window.attachEvent) window.attachEvent("onload", stuHover);

