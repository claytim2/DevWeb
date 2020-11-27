const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';


// Função que cria os cards dos filmes
function MostraFilmesEmCartaz() {
    //Executar requisição AJAX

    $.ajax({
            // Passar a URL ENDPOINT BASE + /movie/now_playing
            url: TMDB_ENDPOINT_BASE + '/movie/now_playing',
            data: {
                api_key: '4cc894b01eadfbbfbff1135572164973'
            }
        })
        // Receber o JSON
        .done(function (data) {
            let codigo_html = '';

            // Montar os cards
            for (i = 0; i < 4; i++) {
                // Concatenar o código do Card com os dados do JSON
                titulo = data.results[i].title;
                imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
                descricao = data.results[i].overview;
                codigo_html += `<div class="col-2"><div class="card" style="width: 18rem;">
                    <img src="${imagem}" class="card-img-top"
                        alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descricao}</p>
                        <a href="#" class="btn btn-primary">Abrir filme</a>
                    </div>
                </div></div>`;
            }
            // Repassar os cards para a página
            $('#index').html(codigo_html)
        });

}

function PesquisaFilmes() {
    $.ajax({
            // Passar a URL ENDPOINT BASE + /movie/now_playing
            url: TMDB_ENDPOINT_BASE + '/search/movie',
            data: {
                api_key: '64eb6f20fd0dabf8f61730c3e55d79b0',
                query: 'star wars'
            }
        })
        // Receber o JSON
        .done(function (data) {
            let codigo_html = '';

            // Montar os cards
            for (i = 0; i < 4; i++) {
                // Concatenar o código do Card com os dados do JSON
                titulo = data.results[i].title;
                imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
                descricao = data.results[i].overview;
                codigo_html += `<div class="col-2"><div class="card" style="width: 18rem;">
                    <img src="${imagem}" class="card-img-top"
                        alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descricao}</p>
                        <a href="#" class="btn btn-primary">Abrir filme</a>
                    </div>
                </div></div>`;
            }
            // Repassar os cards para a página
            $('#lista_filmes').html(codigo_html)
        });
}


$(document).ready(function () {

    MostraFilmesEmCartaz();

    // $('#btn_Pesquisar').click (PesquisaFilmes);
});