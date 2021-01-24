export const getDirector = (id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=beddfc03d4e9041b7938fd3654c3131a`).then(
        r => r.json()
            .then(data => {
                for (let i = 0; i < data.crew.length; i++) {
                    if (data.crew[i].known_for_department === "Directing") {
                        return data.crew[i].name;
                    }
                }
                return "Director Unknown"
            })
    );
}

export const getActors = async (id) => {
    let r = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=beddfc03d4e9041b7938fd3654c3131a`);
    let data = await r.json();
    if (data.cast.length === 0) {
        return "No Actors";
    }
    let actorsArray = [];
    let length;

    if (data.cast.length < 5 && data.cast.length > 0) {
        length = data.cast.length
    } else if (data.cast.length <= 0) {
        actorsArray.push("No Actors");
        return actorsArray
    } else {
        length = 5;
    }
    for (let i = 0; i < length; i++) {
        actorsArray.push(data.cast[i].name)
    }
    return actorsArray;
}

export const getGenres = async (id) => {
    let r = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=beddfc03d4e9041b7938fd3654c3131a");
    let data = await r.json();
    let genresArray = [];
    if (id.length <= 0) {
        genresArray.push('Genre Unknown');
        return genresArray
    }

    for (let i= 0; i < id.length; i++) {
        for (let j = 0; j < data.genres.length; j ++)
            if (id[i] === data.genres[j].id) {
                genresArray.push(data.genres[j].name)
            }
    }
    return genresArray;
}