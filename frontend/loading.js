const data = {};

fetch('https://5kwlyceua3.execute-api.us-east-1.amazonaws.com/default/home-most_popular', {
      method: 'POST',
      body: JSON.stringify(data)
  }).then((res) => res.json())
  .then((data) => {

      if (data.status == 200) {
          let val = data.body;
          let output = "";
          val.forEach(function(restaurant) {
              output += `
              <div class="rest_container">
                  <a id=${restaurant.rest_id} class="rest_link" href="restaurant.html"><img class="rest_image" src=${restaurant.image}
                   alt="Red dot" /></a>
                  ${restaurant.rest_name}
              </div>`
          });

          document.getElementById('most_popular').innerHTML = output;
          let btn = document.getElementsByClassName('rest_link');
          // console.log(btn);
          for (var i = 0; i < btn.length; i++) {
              btn[i].addEventListener('click', clickFunc);
          }
      }

      console.log("Complete!");
      window.location = ('index.html');
  })