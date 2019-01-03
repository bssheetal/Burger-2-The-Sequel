console.log("Hello there");
$(document).ready(function(){

    $.getJSON("/api/burgers",function(data)
    {
        if(data)
        {
            for(var i=0;i<data.length;i++)
            {
                var ul=$("<ul>"); 
                var li=$("<li>");              
                li.append(`<p>${data[i].name}</p>`);
                var btndevoured=$("<button>");
                btndevoured.addClass("devourit");
                btndevoured.text("devour-it");
                li.append(btndevoured);
                ul.append(li);
                $("#menu-list").append(ul);
            }
        }
    });

    $("#addburgerbtn").on("click", function (event) {

        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger").val().trim(),
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new Burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#devourit").on("click", function (event) {
        //add this prevent default otherwise both PUT and POST get executed
        event.preventDefault();
        var id = $(this).attr("data-id");
        var newstate = $(this).data(true);
        var newdevourstate = {
            devoured: newstate
        };

        $.ajax({
            url: `/api/burgers/${id}`,
            method: "PUT",
            data: newdevourstate
        }).then(function () {
            console.log("changed devour to", newdevourstate);
            // Reload the page to get the updated list
          
                location.reload();
        })
    })

});


