async function getData() {
      let res = await fetch(
        "https://minherratic.herokuapp.com/quiz",
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      let data = await res.json();
      return data
    }

export {getData}