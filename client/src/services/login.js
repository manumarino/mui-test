

export const login = {

    getAccessToken: function (values) {
        fetch("http://localhost:8080/ll", {
            method: 'POST',
            body: JSON.stringify(values),
            mode: "cors"
        }).then(response => {
            var bearer = response.headers.get("Authorization");
            var token = bearer.replace("Bearer ", "")
            localStorage.setItem("token", token)
        })
    }
}
