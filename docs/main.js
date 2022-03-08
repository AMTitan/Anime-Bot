var lastSelected = "sfw";
const types = ["sfw", "nsfw", "games", "person", "other", "search"];

function load(string) {
    $("#height").css("margin-top", (55+$("#top").height())+"px");
    types.forEach(item => {
        document.getElementById(item).style.removeProperty("color");
    });
    lastSelected = string;
    document.getElementById(string).style.color = "green";
    document.getElementById("form1").value = "";
    document.getElementById("loadone").outerHTML = "<div id=\"loadone\"  class=\"mx-auto row p-3 p-md-5 m-md-3 \">\n<div id=\"load\"></div>\n</div>";
    $.each(data, function(i, f) {
        if (f.type === string) {
            for(var i=0;i<f.aliases.length;i++) {
                f.aliases[i] = f.aliases[i].charAt(0).toUpperCase() + f.aliases[i].slice(1);
            }
            try {
                document.getElementById("load").outerHTML = `<div class="bg-white dark:bg-slate-700 shadow-sm mx-auto rounded-lg w-[98%] mb-[50px] cursor-pointer" onclick="clicked(this)"><div class="h-[15px]"></div><h1 class="ml-[15px] text-2xl">${f.usage.charAt(0).toUpperCase() + f.usage.slice(1)}</h1><h1 class="text-md ml-[15px]">${f.description}</h1><div class="h-[15px]"></div><div class="hidden"><hr class="dark:bg-slate-500 bg-slate-200 h-[1px] border-[0px] w-[calc(100%-30px)] ml-[15px]"><div class="h-[15px]"></div><p class="text-2xl ml-[15px]">Aliases</p><p class="text-md ml-[15px]">${ f.aliases.join(", ") || "None"}</p><div class="h-[15px]"></div><hr class="dark:bg-slate-500 bg-slate-200 h-[1px] border-[0px] w-[calc(100%-30px)] ml-[15px]"><div class="h-[15px]"></div><p class="text-2xl ml-[15px]">Usage</p><p class="text-md ml-[15px]"> a!${f.usage} ${f.optinal}</p><div class="h-[15px]"></div></div></div>` + document.getElementById("load").outerHTML;
            } catch (e) {
                console.error(e);
            }
        }
    })
}

function onKey() {
    if (document.getElementById("form1").value === "") {
        load(lastSelected);
    } else {
        var x = document.getElementById("form1").value.toLowerCase();
        types.forEach(item => {
            document.getElementById(item).style.removeProperty("color");
        });
        document.getElementById("loadone").outerHTML = "<div id=\"loadone\"  class=\"mx-auto row p-3 p-md-5 m-md-3 \">\n<div id=\"load\"></div>\n</div>";
        $.each(data, function(i, f) {
            var allowed = false;
            if (f.usage.toLowerCase().includes(x)) allowed = true;
            if (f.description.toLowerCase().includes(x)) allowed = true;
            f.aliases.forEach(String => {
                if (String.toLowerCase().includes(x)) allowed = true;
            })
            if (allowed) {
                for(var i=0;i<f.aliases.length;i++) {
                    f.aliases[i] = f.aliases[i].charAt(0).toUpperCase() + f.aliases[i].slice(1);
                }
                try {
                    document.getElementById("load").outerHTML = `<div class="bg-white dark:bg-slate-700 shadow-sm mx-auto rounded-lg w-[98%] mb-[50px] cursor-pointer" onclick="clicked(this)"><div class="h-[15px]"></div><h1 class="ml-[15px] text-2xl">${f.usage.charAt(0).toUpperCase() + f.usage.slice(1)}</h1><h1 class="text-md ml-[15px]">${f.description}</h1><div class="h-[15px]"></div><div class="hidden"><hr class="dark:bg-slate-500 bg-slate-200 h-[1px] border-[0px] w-[calc(100%-30px)] ml-[15px]"><div class="h-[15px]"></div><p class="text-2xl ml-[15px]">Aliases</p><p class="text-md ml-[15px]">${ f.aliases.join(", ") || "None"}</p><div class="h-[15px]"></div><hr class="dark:bg-slate-500 bg-slate-200 h-[1px] border-[0px] w-[calc(100%-30px)] ml-[15px]"><div class="h-[15px]"></div><p class="text-2xl ml-[15px]">Usage</p><p class="text-md ml-[15px]"> a!${f.usage} ${f.optinal}</p><div class="h-[15px]"></div></div></div>` + document.getElementById("load").outerHTML;
                } catch (e) {
                    console.error(e);
                }
            }
        })
    }
}
var data;
$.getJSON('https://raw.githubusercontent.com/AMTitan/Anime-Bot/master/src/cmds.json', function(response) {
    data = response;
    load('sfw');
})

function update_dark_mode() {
    if (localStorage.getItem("DarkMode") !== null) {
        if (localStorage.getItem("DarkMode") == "true") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem("DarkMode", "true");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("DarkMode", "false");
            document.documentElement.classList.remove("dark");
        }
    }
}

function change_dark_mode() {
    if (localStorage.getItem("DarkMode") == "true") {
        localStorage.setItem("DarkMode", "false");
    } else {
        localStorage.setItem("DarkMode", "true");
    }
    update_dark_mode();
}

window.onresize = function(event) {
    $("#height").css("margin-top", (55+$("#top").height())+"px");
};

function clicked(item) {
    if (item.children[4].classList == "") {
        item.children[4].classList.add("hidden");
        item.classList.remove("dark:border-slate-500");
        item.classList.remove("border-slate-200");
        item.classList.remove("border-2");
    }
    else {
        item.children[4].classList.remove("hidden");
        item.classList.add("dark:border-slate-500");
        item.classList.remove("border-slate-200");
        item.classList.add("border-2");
    }
}

update_dark_mode();