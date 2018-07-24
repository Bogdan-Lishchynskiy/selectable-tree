$(function() {
    
  const data = {
    menu: [
      {
        name: "Option 1",
        link: "1",
        sub: null
      },
      {
        name: "Option 2",
        link: "2",
        sub: [
          {
            name: "Option 21",
            link: "2-1",
            sub: null
          },
          {
            name: "Option 22",
            link: "2-2",
            sub: [
              {
                name: "Option 221",
                link: "2-2-1",
                sub: null
              },
              {
                name: "Option 222",
                link: "2-2-2",
                sub: null
              },
              {
                name: "Option 223",
                link: "2-2-3",
                sub: null
              }
            ]
          },
          {
            name: "Option 23",
            link: "2-3",
            sub: null
          }
        ]
      },
      {
        name: "Option 3",
        link: "3",
        sub: [
          {
            name: "Option 31",
            link: "3-1",
            sub: null
          },
          {
            name: "Option 32",
            link: "3-2",
            sub: null
          }
        ]
      }
    ]
  };

  const getMenuItem = function(itemData) {
    const classForItem = itemData.sub ? "menuFolder" : "menuItem";
    const item = $("<li>").append(
      $("<a>", {
        href: "#",
        class: classForItem,
        html: itemData.name
      })
    );
    if (itemData.sub) {
      const subList = $("<ul>");
      $.each(itemData.sub, function() {
        subList.append(getMenuItem(this));
      });
      item.append(subList);
    }
    return item;
  };

  const $menu = $("#menu");
  $.each(data.menu, function() {
    $menu.append(getMenuItem(this));
  });
  $menu.menu();

  $(".menuItem").on("click", function(e) {
    let dynamicContent = $("#dynamicContent");
    let isExist = false;
    dynamicContent.find("input[type=button]").each(function() {
      if ($(this).val() === e.target.innerHTML) {
        console.warn("this item already added!");
        isExist = true;
      }
    });
    $("#menu").hide();
    $("#showMenu").show();
    if (isExist) return;
    dynamicContent.append(
      '<input type="button"  name="menuButton" value="' +
        e.target.innerHTML +
        '">&nbsp;'
    );
    dynamicContent.append(
      '<input type="text" name="inputOptions" value="" placeholder="Input text"><br>'
    );
  });

  $("#submitButton").on("click", function() {
    const dynamicContent = $("#dynamicContent");
    let submitText = "";
    let notEmpty = 0;
    dynamicContent.find("input[type=text]").each(function() {
      if ($(this).val() !== "") {
        notEmpty++;
        submitText +=
          $(this)
            .prev("input")
            .attr("value") +
          ":" +
          $(this).val() +
          "; ";
      }
    });
    if (notEmpty > 0) console.log("Submitted: " + submitText);
    else console.error("No any text input!");
  });

  $("#clearForm").on("click", function() {
    const dynamicContent = $("#dynamicContent");
    dynamicContent.empty();
  });

  $("#showMenu").on("click", function() {
    $("#menu").show();
    $("#showMenu").hide();
  });
});