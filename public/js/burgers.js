console.log("Hello there");
$(document).ready(function () {

    function getallburgers() {
        $.getJSON("/api/burgers", function (data) {
            $("#menu-list").empty();
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var ul = $("<ul>");
                    var li = $("<li>");
                    li.append(`<p>${data[i].name}</p>`);
                    // li.append(`${data[i].id}`);
                    var btndevoured = $("<button>");
                    btndevoured.addClass("devourit");
                    btndevoured.text("Devour-It");
                    btndevoured.attr("data-btn-id",`${data[i].id}`);
                    li.append(btndevoured);
                    ul.append(li);
                    $("#menu-list").append(ul);
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

    $(document).on("click", ".devourit",function (event) {
        //add this prevent default otherwise both PUT and POST get executed
        event.preventDefault();
        
        var id = $(this).attr("data-btn-id");
        // var newstate = $(this).data(true);
        var newdevourstate = {
           
        };
        
        $.ajax({
            url: `/api/burgers/${id}`,
            method: "PUT",
            data: {
                devoured_state: true
            }
        }).then(function (data) {
            console.log("changed devour to", newdevourstate);
            // Reload the page to get the updated list
            if (data) {
                getallburgers();
            }
            location.reload();
        })
     })

});


