console.log("Hello there");
$(document).ready(function () {

    function getallburgers() {
        $.getJSON("/api/burgers", function (data) {
            $("#menu-list").empty();
            $("#devoured-list").empty();
            if (data) {
                
                for (var i = 0; i < data.length; i++) {
                    console.log("line 11 if"+data[i].devoured_state+data[i].name);
                    if (data[i].devoured_state === "false") {

                        console.log("inside loop if"+data[i]);
                        var ul = $("<ul>");
                        var li = $("<li>");
                        li.addClass("menuitem");
                       // li.append(`${data[i].id}`);
                        li.append(`<p>${data[i].name}</p>`);                       
                        var btndevoured = $("<button>");
                        btndevoured.addClass("devourit");
                        btndevoured.text("Devour-It");
                        btndevoured.attr("data-btn-id", `${data[i].id}`);
                        btndevoured.attr("data-btn-name",`${data[i].name}`);
                        $("#menu-list").append(btndevoured);
                        li.append(btndevoured);
                        ul.append(li);
                        $("#menu-list").append(ul);
                    }

                    else {
                        var ul = $("<ul>");
                        var li = $("<li>");
                        li.append(`${data[i].name}`);
                        ul.append(li);
                        $("#devoured-list").append(ul);
                    }
                }
            }

        });
    }

    getallburgers();

    $("#addburgerbtn").on("click", function (event) {

        event.preventDefault();

        var newBurger = {
            name: $("#burger").val().trim(),
            devoured_state: false

        };
        console.log("New burgers name is" + newBurger);
        $.post("/api/burgers", newBurger, function (data) {
            console.log("created new Burger");
            // Reload the page to get the updated list
            if (data) {
                console.log(data);
                getallburgers();
                $("#burger").val("");
            }

        }
        );


    })

    $(document).on("click", ".devourit", function (event) {
        //add this prevent default otherwise both PUT and POST get executed
        event.preventDefault();

        var id = $(this).attr("data-btn-id");
        var menuitem=$(this).attr("data-btn-name");
        console.log("menuitem"+menuitem);
        $.ajax({
            url: `/api/burgers/${id}`,
            method: "PUT",
            data: {
                devoured_state: true
            }
        }).then(function (data) {

            // Reload the page to get the updated list
            if (data) {               
                console.log(data);
                //$("#devoured-list").append(`${menuitem}`);
               // $(this).empty();
                console.log("this consists"+JSON.stringify(this));
                //$("#menu-list").empty();
               getallburgers();
            }
            
        })


    })

});


