//이벤트 이름을 정의. 모바일과 PC에서의 분기처리를 필요로 하기때문이다.
var press = isMobile()?'touchend':'click';
var hover = isMobile()?'touchstart':'mouseon';

//game객체 정의. 게임과 관련된 모든 메소드와 프로퍼티를 정의한다.
var game = {};

//게임 로그창에 로그를 띄우기 위한 메소드.
game.log = function (elem) {
  $('#log').append(elem).append('<br>')[0]
           .scrollTo(0, $('#log br').length * 300);
}

//작성된 로그를 지우기 위한 메소드.
game.clearLog = function () {
  $('#log').html(null);
}

//기본의 window.alert을 대체할 alert메소드를 선언.
game.alert = function (str, speed, noneBlurDisplay) {
  if (!noneBlurDisplay) game.blurDisplay(true);
  $('#game-alert p').html(str);
  $('#game-alert').css('display', 'block').css('opacity', 0);
  game.resizeEve();

  return new Promise(resolve => {
    frame.add({
      callback: i => $('#game-alert').css('opacity', i).css('filter', `blur(${(1-i)*5}px)`),
      duration: speed || 350
    }).then(()=>{
      $('#game-alert a').on(press, function () {
        $(this).off(press);
        $('#game-alert').css('display', 'none');
        if (!noneBlurDisplay) game.blurDisplay(false);
        resolve();
      });
    });
  });
}

//기본의 window.confirm을 대체할 confirm메소드를 선언.
game.confirm = function (str, speed, noneBlurDisplay) {
  if (!noneBlurDisplay) game.blurDisplay(true);
  $('#game-confirm p').html(str);
  $('#game-confirm').css('display', 'block').css('opacity', 0);
  game.resizeEve();

  return new Promise(resolve => {
    frame.add({
      callback: i => $('#game-confirm').css('opacity', i).css('filter', `blur(${(1-i)*5}px)`),
      duration: speed || 350
    }).then(()=>{
      let reset = () => {
        if (!noneBlurDisplay) game.blurDisplay(false);
        $('#confirm-yes').off(press);
        $('#confirm-no').off(press);
        $('#game-confirm').css('display', 'none');
      }

      $('#confirm-yes').on(press, function () {
        reset();
        resolve(true);
      });

      $('#confirm-no').on(press, function () {
        reset();
        resolve(false);
      });
    });
  });
}

//기본의 window.prompt을 대체할 prompt메소드를 선언.
game.prompt = function (str, speed, noneBlurDisplay) {
  $('#game-prompt p').html(str);
  $('#game-prompt').css('display', 'block').css('opacity', 0);
  $('#game-prompt input').val(null);
  game.resizeEve();

  return new Promise(resolve => {
    if (!noneBlurDisplay) game.blurDisplay(true);
    frame.add({
      callback: i => $('#game-prompt').css('opacity', i).css('filter', `blur(${(1-i)*5}px)`),
      duration: speed || 350
    }).then(()=>{
      $('#game-prompt a').on(press, function () {
        if (!noneBlurDisplay) game.blurDisplay(false);
        $(this).off(press);
        $('#game-prompt').css('display', 'none');
        resolve($('#game-prompt input').val());
      });
    });
  });
}

//새로운 창을 띄울 때 뒷 배경을 흐리게 하기 위해
//엘리먼트를 조작하느 메소드를 선언.
game.blurDisplay = function (bool) {
  $('#display-wrapper').css('display', bool?'block':'none')
                       .css('background', rgba(65,65,65,0.8))
                       .html(null);
  if (bool) frame.add({
    callback: i => $('#display-wrapper').css('opacity', i),
    duration: 250
  });
}

//게임내 뉴스 소식을 정리하는 객체를 선언.
game.news = {};

//사용자 데이터를 저장할 객체를 선언.
game.user = {
  update() {
    this.updateAcademicDegree();
    $('#age').html(this.age);
    $('#job').html(this.job);
    $('#money, #money-lv').html(this.assets);
    $('#edu-lv').html(Math.floor(this.eduLV));
    $('#health-lv').html(this.healthLV);
    $('#stress-lv').html(this.stressLV);
    $('#organized-data').html($('#state-bar').text());
    $('#is-user-studying').html(this.studying? "활성화" : "비활성화");
  },

  updateAcademicDegree() {
    var user = game.user;
    var result = "";

    if (user.droppingOutHighSCH) {
      result = "고등학교 중퇴.";
    }

    if (!user.droppingOutHighSCH && user.highSchoolGrade) {
      for (var i = 1; i < user.highSchoolGrade.length; i++) {
        result += `고등학교 ${i}학년: ${user.highSchoolGrade[i]}등급 <br>`;
      }
    }

    result += "<br>";

    if (user.droppingOutCollege) {
      result += "대학교 중퇴.";
    }

    if (!user.droppingOutCollege && user.collegeGrade) {
      for (var i = 1; i < user.collegeGrade.length; i++) {
        result += `대학교 ${i}학년: ${user.collegeGrade[i]}등급 <br>`;
      }
    }

    $('#academic-degree').html(result);
  },

  die(deathCase, messege, imgSRC) {
    game.user.isDeath = true;
    game.blurDisplay(false);
    $('div:not(#user-death)').css('display', 'none');
    $('#organized-data-when-death').html($('#state-bar').text());
    $('#death-case').html(deathCase);
    $('#death-messege').html(messege);
    $('#death-img').html(imgSRC).addClass('image');
    loadImage();
    $('#display-wrapper, #user-death').css('display', 'block');
    game.resizeEve();
    frame.add({
      callback: i => {
        $('#display-wrapper').css('background', rgba((1-i)*255, (1-i)*255, (1-i)*255, i));
        $('#user-death').css('opacity', i);
      },
      duration: 1500
    });
    return true;
  },

  suicide() {
    game.user.die("자살", `
      서람은 힘들 때 약한 마음을 품기 마련입니다.
      하지만 그것을 이겨낼 수 있다면
      당신의 앞날은 분명 그 누구보다 빛나는 인생이 기다리고 있을 것 입니다.
    `, 'assets/img/death/sample.JPG');
  }
};

//플레이어가 사망하는 조건을 담는 메소드.
game.user.deathEvent = function () {
  if (game.user.deathEvent.naturalDeath()) {
    return game.user.die("자연사", `
      당신은 침대위에서 편안한 죽음을 맞이했습니다.
      누군가가 당신의 죽음을 슬퍼하고 또 앞으로 기릴 것 입니다.
      대단한 인생이었거나, 또는 비참한 인생이었더라도 당신의 삶은 그 무엇보다 고귀했습니다.
    `, 'assets/img/death/sample.JPG');
  }

  if (game.user.deathEvent.carAccident()) {
    return game.user.die("교통사고", `
      안타깝게도 당신은 차에 치여 눈을 감았습니다.
      다행히 근처의 시민들은 서둘러 신고를 하여 운전자를 찾았다고 합니다.
      사고 현장에는 당신의 죽음을 안타까워하는 이들이 아름다운 꽃을 놓고 갔습니다.
    `, 'assets/img/death/sample.JPG');
  }

  if (game.user.deathEvent.overworkDeath()) {
    return game.user.die("과로사", `
      '일하지 않는 자여, 먹지도 말라' 라는 말이 있듯이 사람은 살명서 일을 해야합니다.
      그래도 가끔은 휴식이 필요한 법입니다.
      아무리 돈이 좋더라도, 결국 나중에는 아무것도 남지 않습니다.
    `, 'assets/img/death/sample.JPG');
  }

  if (game.user.deathEvent.naturalDisaster()) {
    return game.user.die("자연재해", `
      고대부터 인간은 자연재해를 두려워했습니다.
      그것은 현대에 와서도 결코 변함이 없습니다.
      하지만 사람들은 언제나 역경을 딛고 극복하는 법입니다.
      그렇기 때문에 우리는 언제나 대비하고 있습니다.
      물론 쉽지는 않습니다.
    `, 'assets/img/death/sample.JPG');
  }

  return false;
}

//자연사 판정...
game.user.deathEvent.naturalDeath = function () {
  var a = game.user.age;
  return percent(0.000003 * a**3.2 + 0.0003);
}

//교통사고 사망 판정...
game.user.deathEvent.carAccident = function () {
  var a = game.user.age;
  if (a < 5) return false;
  if (a > 100) return percent(5);
  return percent((a - 15) * 0.02);
}

//과로사 사망 판정...
game.user.deathEvent.overworkDeath = function () {
  return (game.user.healthLV <= 0 || game.user.stressLV >= 100);
}

//자연재해로 인한 사망 판정...
game.user.deathEvent.naturalDisaster = function () {
  return percent(game.news.naturalDisaster? 1:0);
}

//1년 후로 이동하기 위한 메소드.
game.addYear = function () {
  var user = game.user;

  game.news.naturalDisaster = false;

  if (user.isDeath) return;
  if (user.deathEvent()) return;

  user.age++;

  if (user.studying) {
    if (user.age > 12) {
      let stressDMG = 2,
          healthDMG = 2,
          eduIncrease = 0.875;
      user.stressLV += stressDMG;
      user.healthLV -= healthDMG;
      user.eduLV += eduIncrease;
      game.log(animeText.slideIn(
        `열심히 공부하여 학력이 오르려고 합니다. 대신, 스트레스가 ${stressDMG}% 증가하고 체력이 ${healthDMG}% 하락하였습니다.`
      ));
    } else {
      let eduIncrease = 0.5;
      user.eduLV += eduIncrease;
      game.log(animeText.slideIn(
        `공부를 해서 학력이 오르려고 합니다. 하지만 아직 어려서 학력이 오르는 속도는 느린 것 같습니다.`
      ));
    }

    if (user.eduLV > 10) user.eduLV = 10;
  }

  if (user.stressLV > 0) {
    user.stressLV -= 5;
    game.log(animeText.slideIn(
      `매년 스트레스가 5%씩 감소합니다.`
    ));
  }

  if (user.stressLV < 0) user.stressLV = 0;

  if (user.age > 12) {
    user.healthLV -= 1;
    if (user.age == 13) game.log(animeText.warn(`13세 이후부터는 매년 체력이 1%씩 감소합니다.`));
    game.log(animeText.warn("체력이 1% 감소하였습니다."));
  }

  if (user.age == 6) {
    game.log(animeText.slideIn("이제부터 당신은 공부를 할 수 있습니다! 교육탭에서 확인해보세요."));
  }

  if (user.age == 8) {
    game.log(animeText.slideIn(
      `8살이 되어 초등학교에 입학하였습니다!!!`, false, '#B2EBF4'
    ));
    game.user.job = "초등학생";
  }

  if (user.age == 14) {
    game.log(animeText.slideIn(
      `14살이 되어 중학교에 입학하였습니다!!!`, false, '#B2EBF4'
    ));
    game.user.job = "중학생";
  }

  if (user.age == 17) {
    user.highSchoolGrade = [null];
    if (user.eduLV > 3) {
      game.log(animeText.slideIn(
        `17살이 되어 중학교를 졸업하고 고등학교 입학에 합격했습니다! 당신은 고등학교에 입학하였습니다!`, false, '#B2EBF4'
      ));
      game.log(animeText.slideIn(
        `만약 학교생활이 마음에 들지 않는다면 교육탭에서 언제든지 자퇴할 수 있습니다.`, false, '#F15F5F'
      ));
      $('#dropping-out-of-school').css('display', 'block');
      game.user.job = "고등학생";
    } else {
      game.log(animeText.slideIn(
        `17살이 되어 중학교를 졸업하였지만 학력이 너무 낮아 어떠한 고등학교도 입학하지 못했습니다. 이제 당신은 백수입니다.`, false, '#F15F5F'
      ));
      game.user.job = "무직";
    }
  }

  if (user.age >= 18 && user.age <= 20 && game.user.job == "고등학생") {
    let e = user.eduLV;
    user.highSchoolGrade[user.age - 17] = e==4?"C":e==5?"B":"A";

    game.log(animeText.slideIn(
      `당신의 고등학교 ${user.age - 17}학년 성적은 ${user.highSchoolGrade[user.age - 17]}입니다.`
    ));
  }

  if (user.age == 19 && game.user.job == "고등학생") {
    game.log(animeText.slideIn(
      `19살이 되어 대학 진학을 준비해야합니다. 교육탭에서 진학하고 싶은 학교를 선택해주십시오.`
    ));
    $('#hope-college').css('display', 'block')
    $('#hope-college select')
    .on('change', function () {
      var select = $(this).val();
      if (select == 'no-select') user.hopeCollege = null;
      else user.hopeCollege = select;
    });
  }

  if (user.age == 20 && game.user.job == "고등학생") {
    $('#hope-college').css('display', 'none').html(null);
    let HC = user.hopeCollege;
    user.collegeGrade = [null];

    if (!HC) {
      game.log(animeText.slideIn(
        `당신은 아무런 대학도 가지 않을 것을 선택했습니다. 이제 당신은 백수입니다.`
      ));
      user.job = "무직";
    } else {
      if (user.eduLV > 4) {
        game.log(animeText.slideIn(
          `당신이 지원한 대학교 ${HC}과에 합격했습니다! 당신은 이제 ${HC}과 학생입니다!`, false, '#B2EBF4'
        ));
        user.job = `대학교 ${HC}과 학생`;
      } else {
        game.log(animeText.slideIn(
          `당신이 지원한 대학교 ${HC}과에 합격하지 못했습니다. 당신은 이제 백수입니다.`, false, '#F15F5F'
        ));
        user.job = "무직";
      }
    }
  }

  if (user.age >= 21 && user.age <= 24 && (game.user.job!=game.user.job.replace("대학"))) {
    let e = user.eduLV;
    user.collegeGrade[user.age - 20] = e==5?"C":e==6?"B":"A";

    game.log(animeText.slideIn(
      `당신의 대학교 ${user.age - 20}학년 성적은 ${user.collegeGrade[user.age - 20]}입니다.`
    ));
  }

  if (user.age == 24 && (game.user.job!=game.user.job.replace("대학"))) {
    game.log(animeText.slideIn(
      `당신은 대학교를 성공적으로 졸업했습니다! 하지만 이제 당신은 백수입니다.`, false, '#B2EBF4'
    ));
    $('#dropping-out-of-school').css('display', 'none');
    user.job = "무직";
  }

  if (percent(10)) {
    game.news.naturalDisaster = true;
    game.log(animeText.warn("뉴스 속보!\n지구의 변화를 감지?"));
  }

  user.update();
  game.log(animeText.scaleIn(`이제 당신은 ${user.age}살입니다!`));
  game.log(document.createElement('hr'));
}

//게임과 관련된 윈도우 리사이즈 이벤트를 선언.
//이벤트 리스너는 로드후 초기설정에서 추가한다.
game.resizeEve = function () {
  var round = n => Math.round(n);
  var getCRect = query => $(query)[0].getBoundingClientRect();

  $('#floating-bar').css('left', round((innerWidth - $('#floating-bar')[0].offsetWidth)/2) + 'px');
  $(`
    #game-alert,
    #game-confirm,
    #game-prompt,
    #menu-main,
    #menu-edu,
    #menu-job,
    #menu-life,
    #user-death
  `).each(function () {
    $(this).css('left', round((innerWidth - this.offsetWidth)/2) + 'px')
    $(this).css('top', round((innerHeight - this.offsetHeight)/2) + 'px');
  });

  $('#log').css('height', round(innerHeight - getCRect('#floating-bar').height - getCRect('#log').top - 15) + 'px');
}

//메뉴를 열거나 닫는 메소드를 정의.
game.openMenu = {
  main() {
    game.blurDisplay(true);
    $('#menu-main').css('display', 'block').css('opacity', 0);
    game.resizeEve();
    frame.add({
      callback: i => $('#menu-main').css('opacity', i),
      duration: 250
    });
  },

  education() {
    if (game.user.age < 6) {
      return game.alert("6살 이후부터 교육을 받을 수 있습니다.");
    }

    game.blurDisplay(true);
    $('#menu-edu').css('display', 'block').css('opacity', 0);
    game.resizeEve();
    frame.add({
      callback: i => $('#menu-edu').css('opacity', i),
      duration: 250
    });
  },

  job() {
    game.blurDisplay(true);
    $('#menu-job').css('display', 'block').css('opacity', 0);
    game.resizeEve();
    frame.add({
      callback: i => $('#menu-job').css('opacity', i),
      duration: 250
    });
  },

  life() {
    game.blurDisplay(true);
    $('#menu-life').css('display', 'block').css('opacity', 0);
    game.resizeEve();
    frame.add({
      callback: i => $('#menu-life').css('opacity', i),
      duration: 250
    });
  },

  close(elem) {
    game.blurDisplay(false);
    frame.add({
      callback: i => $(elem.parentElement).css('opacity', 1 - i),
      duration: 250
    }).then(() => {
      $(elem.parentElement).css('display', 'none');
    });
  }
}

//게임과 관련된 내용을 초기화한다.
game.init = function () {
  game.resizeEve();
  $(window).on('resize', game.resizeEve);
  $('#user-data-submit').on(press, game.submitUserData);
  $('#menu-main-btn').on(press, game.openMenu.main);
  $('#menu-edu-btn').on(press, game.openMenu.education);
  $('#menu-job-btn').on(press, game.openMenu.job);
  $('#menu-life-btn').on(press, game.openMenu.life);

  $('#add-year').on(press, async function () {
    var yn = await game.confirm("정말로 1년을 넘기시겠습니까?");
    if (yn) game.addYear();
  });

  $('#suicide-btn').on(press, async function () {
    $('.close').trigger(press);
    var yn = await game.confirm("정말로 자살하시겠습니까?");
    if (yn) yn = await game.confirm("정말입니까?");
    else return;
    if (yn) game.user.suicide();
  });

  $('#clear-log-btn').on(press, async function () {
    $('.close').trigger(press);
    var yn = await game.confirm("정말로 로그를 전부 지우시겠습니까?");
    if (yn) {
      game.clearLog();
      game.alert("로그가 전부 삭제되었습니다.");
    }
  });

  $('#studying-btn').on(press, function () {
    game.user.studying = !game.user.studying;
    $('#studying-btn').css('background', game.user.studying?"#86E57F":"#F15F5F");
    game.user.update();
  });

  $('#dropping-out-of-school').on(press, async function () {
    $('.close').trigger(press);
    var yn = await game.confirm("정말로 자퇴하시겠습니까?");
    if (yn) {
      $(this).css('display', 'none');
      if (game.user.job == "고등학생") {
        game.user.droppingOutHighSCH = true;
      } else if (game.user.job!=game.user.job.replace("대학")) {
        game.user.droppingOutCollege = true;
      }
      game.user.job = "무직";
      game.alert("자퇴하였습니다. 당신은 이제 백수입니다.");
      game.log(animeText.warn("다니던 학교를 떠났습니다."));
      game.user.update();
    }
  });

  $('.close').on(press, function () {
    game.openMenu.close(this);
  });

  game.user.age = 0;
  game.user.assets = 0;
  game.user.stressLV = 0;
  game.user.healthLV = 100;
  game.user.eduLV = 0;
  game.user.job = "무직";
}

//본격적인 게임을 시작한다.
game.start = async function () {
  game.user.age++;
  game.user.update();
  await game.alert("이 게임은 저장 기능을 지원하지 않습니다. 게임에서 벗어나면 진행중인 내용이 모두 사라집니다.");
  await wait(100);
  game.log(animeText.scaleIn(`당신이 ${game.user.nation}에서 ${game.user.sex}으로 태어났습니다! 당신의 이름은 ${game.user.name}입니다!`));
  game.log(animeText.scaleIn(`이제 당신은 1살입니다!`));
  game.log(document.createElement('hr'));
}

//유저에게 초기 정보를 요구하는 엘리먼트를 보여준다.
game.requestUserData = function () {
  frame.add([{
    callback: i => {
      $('#loading').css('opacity', 1 - i);
      if (i == 1) {
        $('#loading').css('display', 'none');
        $('#loading-circle').addClass('onload');
        $('#user-init-input').css('display', 'block').css('opacity', 0);
      }
    },
    duration: 500
  }, {
    wait: 250
  }, {
    callback: i => $('#user-init-input').css('opacity', i),
    duration: 500
  }]);
}

//입력한 데이터를 검사하고 문제가 없으면 이를 game.user에 저장한다.
game.submitUserData = function () {
  var name = $('#user-name').val();
  var nation = $('#user-nation').val();
  var sex = $('#user-sex').val();
  var wealth = $('#user-wealth').val();
  var undef = 'no-select';

  if (!name) {
    return game.alert("이름이 입력되지 않았습니다.", 100, true);
  } else if (name.length > 13) {
    return game.alert("이름이 너무 길어서 저장하지 못했습니다. 최대 12글자까지 입력가능합니다.", 100, true);
  } else {
    $('#name').html(name);
    game.user.name = name;
  }

  if (nation == undef) {
    return game.alert("국가가 선택되지 않았습니다.", 100, true);
  } else {
    game.user.nation = nation;
  }

  if (sex == undef) {
    return game.alert("성별이 선택되지 않았습니다.", 100, true);
  } else {
    game.user.sex = sex;
  }

  if (wealth == undef) {
    return game.alert("집안 형편이 선택되지 않았습니다.", 100, true);
  } else {
    game.user.wealth = wealth;
  }

  $(this).css('display', 'none');

  frame.add({
    callback: i => $('#display-wrapper').css('opacity', 1 - i)
  }).then(() => {
    $('#display-wrapper').css('display', 'none');
    setTimeout(game.start, 500);
  });
}

//로드가 끝날 경우, 게임 초기화를 하고 사용자의 초기 데이터를 입력하도록 유도한다.
$(window).on('load', function () {
  game.init();
  setTimeout(game.requestUserData, 350);

  //일부 모바일기기에서 overflow:hidden을 무시하고 화면이 스크롤되는 문제가 발생하기 때문에
  //스크롤때마다 스크롤 위치를 변경시켜줄 필요가 있다.
  setInterval(() => {
    window.scrollTo(0,0);
    game.resizeEve();
  }, 500);
  $(window).on('scroll', ()=>{window.scrollTo(0,0)});
  $('body').on('touchstart', game.resizeEve);
});
