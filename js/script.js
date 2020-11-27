const apiKey = config.API_KEY
const baseURL = 'http://image.tmdb.org/t/p/'

var mostPopularMovies = []

function getTrendingList () {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`

  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(res => {
      mostPopularMovies = res.results

      setBannerImage(mostPopularMovies)
      setTitle()
      setMoviesTable(mostPopularMovies)
    })
}

function getRecomendations (item) {
  const url = `https://api.themoviedb.org/3/movie/${item.id}/recommendations?api_key=${apiKey}`

  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(res => {
      let items = res.results
      var recommendations = document.getElementById('recommendations')

      for (var i = 0; i < items.length; i++) {
        let item = items[i]
        let tmpl = document.getElementById('recomendationsTemplate').content.cloneNode(true)
        tmpl.querySelector('.movie-poster').src = item.poster_path ? `${baseURL}w154/${item.poster_path}` : 'https://via.placeholder.com/154x239.png?text=NO+IMAGE'
        tmpl.querySelector('.movie-title').innerText = item.original_title
        tmpl.querySelector('.item').onclick = setMovie.bind(event, item)
        recommendations.appendChild(tmpl)
      }
    })
}

function search (page) {
  let searchInput = document.getElementById('searchInput').value

  clearMovie()
  clearTitle()
  clearRecommendation()
  clearPagination()

  if (!searchInput) {
    setTitle()
    setMoviesTable(mostPopularMovies)
    return
  }

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${searchInput}`

  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(res => {
      setMoviesTable(res.results)
      setPagination(res)
    })
}

function setBannerImage (res) {
  let randomItem = res[Math.floor(Math.random() * 20 + 1)]
  let header = document.getElementById('header')
  header.style.background = randomItem ? `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${baseURL}original/${randomItem.backdrop_path}) no-repeat top` : '#78909C'
  header.style.backgroundSize = 'cover'
}

function setMoviesTable (items) {
  clearMoviesTable()
  var moviesTable = document.getElementById('moviesTable')
  //for (var i = 0; i < items.length; i++) {
  for (var i = 0; i < 4; i++) {
    let item = items[i]
    let tmpl = document.getElementById('movieListTemplate').content.cloneNode(true)
    tmpl.querySelector('.movie-poster').src = item.poster_path ? `${baseURL}w45/${item.poster_path}` : 'https://via.placeholder.com/45x68.png?text=NO+IMAGE'
    tmpl.querySelector('.movie-title').innerText = item.original_title
    tmpl.querySelector('.movie-release-year').innerText = item.release_date.slice(0, 4)
    tmpl.querySelector('.item').onclick = setMovie.bind(event, item)
    moviesTable.appendChild(tmpl)
  }
}

function setPagination (res) {
  clearPagination()

  if (!res.total_results) {
    var title = document.getElementById('title')
    let tmpl = document.getElementById('titleTemplate').content.cloneNode(true)
    tmpl.querySelector('.title').innerText = 'No data available'
    title.appendChild(tmpl)
  } else {
    for (var i = 1; i <= res.total_pages; i++) {
      var pager = document.getElementById('pager')
      let tmpl = document.getElementById('pagerTemplate').content.cloneNode(true)
      tmpl.querySelector('.button').innerText = i
      tmpl.querySelector('.button').onclick = search.bind(event, i)
      if (i !== res.page) {
        tmpl.querySelector('.button').classList.add('is-secondary')
      }
      pager.appendChild(tmpl)
    }

    var title = document.getElementById('title')
    var tmpl = document.getElementById('resultsTemplate').content.cloneNode(true)
    tmpl.querySelector('.results').innerText = 'Results'
    tmpl.querySelector('.label').innerText = res.total_results
    title.appendChild(tmpl)
  }
}

function setMovie (item) {
  clearMoviesTable()
  clearPagination()
  clearTitle()
  clearMovie()
  clearRecommendation()

  getRecomendations(item)

  var movie = document.getElementById('movie')
  var tmpl = document.getElementById('movieTemplate').content.cloneNode(true)
  tmpl.querySelector('.title').innerText = item.original_title
  tmpl.querySelector('.movie-release-year').innerText = item.release_date.slice(0, 4)
  tmpl.querySelector('.movie-poster').src = item.poster_path ? `${baseURL}w342/${item.poster_path}` : 'https://via.placeholder.com/342x513.png?text=NO+IMAGE'
  tmpl.querySelector('.overview').innerText = item.overview
  movie.appendChild(tmpl)
}

function setTitle () {
  var title = document.getElementById('title')
  var tmpl = document.getElementById('titleTemplate').content.cloneNode(true)
  tmpl.querySelector('.title').innerText = 'TENDÊNCIAS SEMANAIS'
  title.appendChild(tmpl)
}

function clearMoviesTable () {
  moviesTable.innerHTML = ''
}

function clearPagination () {
  pager.innerHTML = ''
}

function clearTitle () {
  title.innerHTML = ''
}

function clearMovie () {
  movie.innerHTML = ''
}

function clearRecommendation () {
  recommendations.innerHTML = ''
}

window.onload = function() {
  getTrendingList()

  // Execute a Search function when the user presses Enter key
  let searchInput = document.getElementById("searchInput")

  searchInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      search()
    }

    if (!searchInput.value) {
      clearPagination()
      clearRecommendation()
      clearTitle()
      clearMovie()

      setTitle()
      setMoviesTable(mostPopularMovies)
    }
  })

  searchInput.focus()
}

(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = cssmenu.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          cssmenu.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            cssmenu.find('ul').show();
            cssmenu.removeClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').hide();
            }
            else {
              cssmenu.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
            cssmenu.find('ul').hide().removeClass('open');
            cssmenu.addClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(document).ready(function() {
  $("#cssmenu").menumaker({
    title: "Menu",
    format: "dropdown"
  });

  $("#cssmenu a").each(function() {
  	var linkTitle = $(this).text();
  	$(this).attr('data-title', linkTitle);
  });
});

});
})(jQuery);







