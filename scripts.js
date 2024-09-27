var tmp_chosen = [
  "Uni and the Hunt for the Lost Horn",
  "Ask A (Comics) Librarian!",
  "HBO’s THE PENGUIN: Extended Sneak Peek and Conversations with Colin Farrell, Cast and Creatives",
  "Totally Metal! Create Your Own Chainmail with Cowbutt Crunchies [Separately Ticketed]",
  "Civics For All Comics Group Where We Are And Where We Are Going",
  "The Accessibility Alliance: A Disability-Friendly Meetup",
  "Marisa Tomei Autographing Session",
  "Phil LaMarr Autographing Session",
  "Denise Richards Autographing Session",
  "Jason Mewes Autographing Session",
  "Kevin Smith Autographing Session",
  "Jason Lee Autographing Session",
  "Top 5 Dead or Alive: LIVE!",
  "Keep Bans Off Our Books",
  "The Cast of Starship Troopers",
  "Comics Unleashed: Transforming Education for Every Classroom",
  "Saber Guild Adult Training [Sign-up Required]",
  "Being Nimoy",
  "Utilizing your Makerspace for Comic Con and Beyond",
  "HBO’s DUNE: PROPHECY",
  "Being Nimoy Post Panel Book Signing",
  "Josh Brolin Autographing Session",
  "Busted! Behind the Scenes with the creators of “Phineas and Ferb”",
  "The Way of The Jedi: Lessons in Mindfulness",
  "Pastoria City Trainer School - Pokémon Meetup",
  "Netflix presents THE ELECTRIC STATE",
  "Peacock Presents: Satanic Panic Horror Thriller Hysteria!",
  "Making Queer Games and Making Games Queer",
  "Pizza Rats vs. Bodega Cats!",
  "Cosplay? Let’s Learn How To Crochet!!",
  "“Outlander” Season Seven Part Two Preview",
  "After 50 Years, Why Do Spidey Super Stories Comics Still Matter to Autistic Kids and Everybody Else?",
  "Authors Reading Bad Reviews",
  "Murder Mystery Party",
  "Teenage Mutant Ninja Turtles: Video Games and Virtual Worlds",
  "Walton Goggins Autographing Session",
  "THE LORD OF THE RINGS: THE WAR OF THE ROHIRRIM",
  "Celebrating Queer Joy in Media",
  "Sewing with Electricity! hosted by Plexi Cosplay [Separately Ticketed]",
  "Giant Japanese Calligraphy Performance by Taisan Tanaka",
  "Comics Made Me Gay",
  "Star Trek: Picard’s Todd Stashwick",
  "Marvel Multiverse Role-Playing Game LIVE! Ft. Glass Cannon Network",
  "Reclaiming Queer History Through Comics",
  "NYCC Networking",
  "Spotlight on Tegan and Sara with Tillie Walden",
  "LUCASFILM PUBLISHING: Star Wars: Stories from a Galaxy Far, Far Away",
  "Dominique Jackson Meet and Greet",
  "What We Do in the Shadows (FX) - Moderated Q&A and Exclusive Advance Screening – THE BATS ARE BACK!",
  "Tegan and Sara with Tillie Walden, Book Signing",
  "Trans/Non-Binary Entertainment Panel",
  "Fighting Comic Bans with the Comic Book Legal Defense Fund",
  "Laugh-Out-Loud Sci-Fi Picture Books featuring Monster Ducks, Alien Dogs, and Cookie Time Traveling!",
  "Todd McFarlane Talks Movies, Comics and Toys!",
  "Wheelchair Cosplay: How To Make Accessible Builds For Cosplayers Living With Limited Mobility",
  "Beyond the Binary: Interpretations of Gender in Cosplay with SHEPROP!",
  "It's Never Too Late! Cosplaying for Older Fans",
  "Cyanide & Happiness: Behind the Scenes",
  "Which Cryptid Would Make the Best Boyfriend",
  "Who is Amy Schneider",
  "LGBTQIA+ Romances in Science Fiction and Fantasy",
  "Hugh Dancy Autographing Session",
  "Jodie Whittaker Autographing Session",
  "Mads Mikkelsen Autographing Session",
  "The Simpsons",
  "Drag Queen Panel",
  "Conversation with the King: Activism and Afro-Futurism with Atandwa Kani",
  "Viva La Dirt League - Epic NPC Man!",
  "Drag Panel Merch Sales",
  "Matt Smith Autographing Session",
  "Star Trek Universe",
  "Nintendo Switch Friend Code Meetup",
  "Oracle of Aces: Bridging asexual, agender & aromantic spectrum identities throughout gaming communities",
  "The George Lucas Talk Show",
  "GHOSTS",
  "Let's Learn UV Resin: Create your Own Jewelry and Gems with Cowbutt Crunchies [Separately Ticketed]",
  "Godzilla vs NYCC: 70 Years of the King of the Monsters",
  "Pokémon Ecology Academy: Pokémonology 101",
  "(18+) Jackbox After Dark",
  "(18+) Cyanide & Happiness: After Hours",
  "Futurama",
  "Women in Comics: The Empowerment Era",
  "The Frights and Delights of Queer Horror Comics",
  "Drag Queen Story Hour",
  "Popversus: Star Wars vs. Star Trek",
  "YAS KIDS; Celebrating Queer & Diverse Middle Grade/YA Stories",
  "Jackbox Party Hour",
  "NYCC 90s Trivia",
];
var DateTime = luxon.DateTime;
var schedules;
var panelnames = [];
var panels = [];
var calendar = [];
var locations = [];
var tags = [];
var categories = [];
var days = ["Thursday", "Friday", "Saturday", "Sunday"];

function populate_tags(panel_tags) {
  if (panel_tags != "") {
    var tag_array = panel_tags.split(",");
    //console.log(tag_array);
    $.each(tag_array, function (index, tag) {
      //console.log(tag + ":" + tags.indexOf(tag));
      if (tags.indexOf(tag) == -1) {
        //console.log(tag);
        tags.push(tag);
      }
    });
  }
}

function populate_categories(panel_categories) {
  console.log(panel_categories);
  if (panel_categories != "") {
    var category_array = panel_categories.split(",");
    //console.log(tag_array);
    $.each(category_array, function (index, category) {
      //console.log(tag + ":" + tags.indexOf(tag));
      if (categories.indexOf(category) == -1) {
        //console.log(tag);
        categories.push(category);
      }
    });
  }
}

function populate_locations(location) {
  if (locations.indexOf(location) == -1) {
    locations.push(location);
  }
}

function instance_in_calendar(id) {
  var in_cal = false;
  console.log(id);
  $.each(calendar, function (index, entry) {
    if (entry.id == id) {
      in_cal = true;
    }
  });
  return in_cal;
}

function load_my_stuff() {
  $.each(panels, function (index, panel) {
    if (tmp_chosen.includes(panel.title)) {
      panel.status = "chosen";
    } else {
      panel.status = "rejected";
    }
  });
  render_stage();
  render_chosen();
  render_rejected();
  render_calendar();
}

function remove_from_calendar(id) {
  var del_index = -1;
  $.each(calendar, function (index, entry) {
    //console.log(entry.id + ":" + id);
    if (entry.id == id) {
      del_index = index;
    }
  });
  calendar.splice(del_index, 1);
  localStorage.setItem("calendar", JSON.stringify(calendar));
}

function time_available(tmpcal) {
  valid = true;
  var tmp_start = DateTime.fromISO(tmpcal.start_time);
  var tmp_end = DateTime.fromISO(tmpcal.end_time);
  $.each(calendar, function (index, entry) {
    var e_start = DateTime.fromISO(entry.start_time);
    var e_end = DateTime.fromISO(entry.end_time);
    //console.log(e_start);
    //console.log(tmp_start);
    if (tmpcal.id == entry.id) {
      valid = false;
    }
    if (tmp_start >= e_start && tmp_start < e_end) {
      valid = false;
    }
    if (tmp_end >= e_start && tmp_end < e_end) {
      valid = false;
    }
  });
  return valid;
}

function add_to_calendar(tmpcal) {
  var added = false;
  if (time_available(tmpcal)) {
    calendar.push(tmpcal);
    calendar.sort(function (a, b) {
      return new Date(a.start_time) - new Date(b.start_time);
    });
    localStorage.setItem("calendar", JSON.stringify(calendar));
    render_calendar();
    render_chosen();
    added = true;
  } else {
    alert("Failed to Add. Check date and time");
  }
  return added;
}

function render_calendar() {
  $("#Thursday").html("");
  $("#Friday").html("");
  $("#Saturday").html("");
  $("#Sunday").html("");
  $.each(calendar, function (index, calitem) {
    var html =
      '<div class="card" style="margin-bottom:5px;">' +
      '<div class="card-body">' +
      '<strong class="card-title">' +
      DateTime.fromISO(calitem.start_time).toFormat("hh:mm a") +
      " - " +
      DateTime.fromISO(calitem.end_time).toFormat("hh:mm a") +
      "</strong>" +
      '<p class="card-text">(' +
      calitem.location +
      ")</p>" +
      '<p class="card-text">' +
      calitem.title +
      "</p>" +
      "<button class='btn btn-danger btn-sm remove' data-id='" +
      calitem.id +
      "'>remove</button>";
    "</div>" + "</div >";
    //alert(DateTime.fromISO(calitem.start_time).weekdayLong);
    $("#" + DateTime.fromISO(calitem.start_time).weekdayLong).append(html);
    //console.log(calitem);
  });
}

function render_stage() {
  $("#stage").html("");
  $.each(panels, function (index, panel) {
    if (panel.status === "eval") {
      var html = "";
      html =
        "<div class='card' style='margin-bottom:5px;' data-index='" +
        panel.index +
        "'><div class='card-body'>" +
        "<h2 class='card-title'>" +
        panel.title +
        "</h2>" +
        "<button type='button' class='btn btn-success choose' style='margin:5px;' data-index='" +
        panel.index +
        "'>Interested</button>" +
        "<button type='button' class='btn btn-danger reject' data-index='" +
        panel.index +
        "'>Not Interested</button>" +
        "<p class=card-text>" +
        panel.description +
        "</p>";

      $.each(panel.instances, function (index, instance) {
        html +=
          "<div class='instance'> Start: " +
          instance.start_time +
          " End: " +
          instance.end_time +
          " Location: " +
          instance.location +
          "</div>";
      });
      html += "</div></div>";
      //alert(html);
      $("#stage").append(html);
    }
  });
}

function render_chosen() {
  $("#chosen").html("");
  $.each(panels, function (index, panel) {
    if (panel.status === "chosen") {
      var html = "";
      html =
        "<div class='card' style='margin-bottom:5px;' data-index='" +
        panel.index +
        "'><div class='card-body'>" +
        "<h2 class='card-title'>" +
        panel.title +
        "</h2>" +
        // "<button type='button' class='btn btn-success choose' style='margin:5px;' data-index='" +
        // panel.index +
        // "'>Choose</button>" +
        "<button type='button' class='btn btn-primary unchoose' data-index='" +
        panel.index +
        "'>Unchoose</button>" +
        "<p class=card-text>" +
        panel.description +
        "</p>";

      $.each(panel.instances, function (index, instance) {
        var buttonclass = "";
        var tmpcal = {};
        tmpcal.start_time = instance.start_time.replace(" ", "T");
        tmpcal.end_time = instance.end_time.replace(" ", "T");
        tmpcal.id = instance.index;
        tmpcal.location = instance.location;
        tmpcal.title = instance.title;
        if (time_available(tmpcal)) {
          buttonclass = "btn-outline-info";
        } else {
          buttonclass = "btn-danger";
        }
        if (instance_in_calendar(panel.index + "-" + instance.index)) {
          buttonclass = "btn-success";
        }
        html +=
          "<div class='btn " +
          buttonclass +
          " instance' data-id='" +
          panel.index +
          "-" +
          instance.index +
          "' data-title='" +
          panel.title +
          "' data-start='" +
          instance.start_time.replace(" ", "T") +
          "' data-end='" +
          instance.end_time.replace(" ", "T") +
          "' data-location='" +
          instance.location +
          "'> Start: " +
          instance.start_time +
          " End: " +
          instance.end_time +
          " Location: " +
          instance.location +
          "</div>";
      });
      html += "</div></div>";
      //alert(html);
      $("#chosen").append(html);
    }
  });
}

function render_rejected() {
  $("#rejected").html("");
  $.each(panels, function (index, panel) {
    if (panel.status === "rejected") {
      var html = "";
      html =
        "<div class='card' style='margin-bottom:5px;' data-index='" +
        panel.index +
        "'><div class='card-body'>" +
        "<h2 class='card-title'>" +
        panel.title +
        "</h2>" +
        // "<button type='button' class='btn btn-success choose' style='margin:5px;' data-index='" +
        // panel.index +
        // "'>Choose</button>" +
        "<button type='button' class='btn btn-primary unreject' data-index='" +
        panel.index +
        "'>Unreject</button>" +
        "<p class=card-text>" +
        panel.description +
        "</p>";

      $.each(panel.instances, function (index, instance) {
        html +=
          "<div class='instance'> Start: " +
          instance.start_time +
          " End: " +
          instance.end_time +
          " Location: " +
          instance.location +
          "</div>";
      });
      html += "</div></div>";
      //alert(html);
      $("#rejected").append(html);
    }
  });
}

$(document).ready(function () {
  if (localStorage.getItem("panels")) {
    panels = JSON.parse(localStorage.getItem("panels"));
    if (localStorage.getItem("calendar")) {
      calendar = JSON.parse(localStorage.getItem("calendar"));
    }
    render_stage();
    render_chosen();
    render_rejected();
    render_calendar();
  } else {
    $.getJSON(
      "https://register.growtix.com/api/schedules?key=0a00c84d-7546-45e1-a596-96594b5cc463",
      function (jd) {
        schedules = jd.schedules.sort((a, b) => a.title.localeCompare(b.title));
        var tmppanel = {};
        $.each(schedules, function (index, panel) {
          // if (
          //   panel.location == "Main Stage" ||
          //   panel.location == "Empire Stage"
          // ) {
          populate_locations(panel.location);
          populate_categories(panel.category);
          populate_tags(panel.tags);
          if (panelnames.indexOf(panel.title) == -1) {
            if (Object.entries(tmppanel).length === 0 && panels.length === 0) {
              console.log("Starting Panel Ingest");
            } else {
              panels.push(tmppanel);
              tmppanel = {};
            }
            panelnames.push(panel.title);
            tmppanel.index = panels.length;
            tmppanel.status = "eval";
            tmppanel.title = panel.title;
            tmppanel.description = panel.description;
            tmppanel.instances = [];
            var tmpinstance = {};
            tmpinstance.index = 0;
            tmpinstance.start_time = panel.start_time;
            tmpinstance.end_time = panel.end_time;
            tmpinstance.location = panel.location;
            tmppanel.instances.push(tmpinstance);
            // create the panel
          } else {
            var tmpinstance = {};
            tmpinstance.index = tmppanel.instances.length;
            tmpinstance.start_time = panel.start_time;
            tmpinstance.end_time = panel.end_time;
            tmpinstance.location = panel.location;
            tmppanel.instances.push(tmpinstance);
          }
          //console.log(panels.indexOf(panel.title));
          // }
        });
        //console.log(panels);
        localStorage.setItem("panels", JSON.stringify(panels));
        render_stage();
      }
    );
  }
  $("#stage").on("click", ".reject", function (e) {
    panels[$(this).attr("data-index")].status = "rejected";
    $(this).parent().parent().remove();
    render_rejected();
    localStorage.setItem("panels", JSON.stringify(panels));
  });
  $("#stage").on("click", ".choose", function (e) {
    panels[$(this).attr("data-index")].status = "chosen";
    $(this).parent().parent().remove();
    render_chosen();
    localStorage.setItem("panels", JSON.stringify(panels));
  });
  $("#chosen").on("click", ".unchoose", function (e) {
    panels[$(this).attr("data-index")].status = "eval";
    $(this).parent().parent().remove();
    render_stage();
    localStorage.setItem("panels", JSON.stringify(panels));
  });
  $("#chosen").on("click", ".instance", function (e) {
    //console.log($(this));
    var tmpcal = {};
    tmpcal.index = calendar.length;
    tmpcal.start_time = $(this).attr("data-start");
    tmpcal.end_time = $(this).attr("data-end");
    tmpcal.id = $(this).attr("data-id");
    tmpcal.location = $(this).attr("data-location");
    tmpcal.title = $(this).attr("data-title");
    if (add_to_calendar(tmpcal)) {
      $(this).removeClass("btn-outline-info");
      $(this).addClass("btn-success");
    }
  });
  $("#rejected").on("click", ".unreject", function (e) {
    panels[$(this).attr("data-index")].status = "eval";
    $(this).parent().parent().remove();
    render_stage();
    localStorage.setItem("panels", JSON.stringify(panels));
  });
  $("#cal").on("click", ".remove", function (e) {
    remove_from_calendar($(this).attr("data-id"));
    $("#chosen [data-id='" + $(this).attr("data-id") + "']").removeClass(
      "btn-success"
    );
    $("#chosen [data-id='" + $(this).attr("data-id") + "']").removeClass(
      "btn-danger"
    );
    $("#chosen [data-id='" + $(this).attr("data-id") + "']").addClass(
      "btn-outline-info"
    );
    render_calendar();
  });
});
