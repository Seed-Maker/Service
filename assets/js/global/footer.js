location.href = '/home';

window.addEventListener('DOMContentLoaded', function () {
  ajax.fetch({
    path: '/home/assets/html/global/footer.html'
  }).then(function (response) {
    $('footer').innerHTML = response;
  });
}, false);
