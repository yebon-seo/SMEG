const menuBtn = document.querySelectorAll(".menu-btn");
const fixedMenu = document.querySelector(".fixed");
const cBTn = document.querySelector(".close-btn");
const container = document.querySelector("#hover-menu");
const topBtn = document.querySelector("#topbtn");

window.onscroll = function() {
  if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    topBtn.style.display = "block";
  }else {
    topBtn.style.display = "none";
  }
}
topBtn.addEventListener("click", function() {
  window.scrollTo({ top:0, behavior: "smooth"})
})


menuBtn.forEach(btn => btn.addEventListener("click", () => {
  console.log(menuBtn)
  fixedMenu.style.opacity = "1"
  fixedMenu.style.visibility = "visible"
  container.style.maxHeight = "0px"
}))

cBTn.addEventListener("click", () => {
  fixedMenu.style.opacity = "0"
  fixedMenu.style.visibility = "hidden"
})



/*블렌더 무빙이미지 효과*/
const controller = new ScrollMagic.Controller();

const winWd = window.innerWidth
// console.log(winWd)
if (winWd >= 950) {
  scrollMagic1()
} else {
  scrollMagic2()
}

addEventListener("resize", () => {
  const winWd = window.innerWidth
  if (winWd >= 950) {
    scrollMagic1()
  } else {
    scrollMagic2()
  }
})

function scrollMagic1() {
  const moveTween = gsap.fromTo(
    ".moving-img img", //타켓요소
    { x: 0 }, //시작위치(처음 위치)
    { x: "-30vw", ease: "linear" } //끝나는 위치
  );

  new ScrollMagic.Scene({
    triggerElement: "#blender-detail",//애니메이션 시작지점
    duration: "40%", //애니메이션 스크롤 길이
    offset: -150,
    triggerHook: 0.5, //화면 가장위 도착했을 때 시작
  })
  .setTween(moveTween)
  //.addIndicators({ name: "무빙 이미지" })  디버깅 선 제거해도 됨
  .addTo(controller);
}

function scrollMagic2() {
  const moveTween = gsap.fromTo(
    ".moving-img img", //타켓요소
    { x: 0 }, //시작위치(처음 위치)
    { x: "-70vw", ease: "linear" } //끝나는 위치
  );
  
  new ScrollMagic.Scene({
    triggerElement: "#blender-detail",//애니메이션 시작지점
    duration: "40%", //애니메이션 스크롤 길이
    offset: 600,
    triggerHook: 1, //화면 ( 위치 ) 도착했을 때 시작
  })
  .setTween(moveTween)
  //.addIndicators({ name: "무빙 이미지" })  //디버깅 선 제거해도 됨
  .addTo(controller);
}

/*작은화면 메뉴*/
// 1차 메뉴 항목들을 모두 선택

const depth1Menu = document.querySelectorAll(".s-f-depth1 > li > a")
const depth2Menu = document.querySelectorAll(".depth2-wrap2 > .depth2 > li > a")
const depth2Lists = document.querySelectorAll(".depth2-wrap2")
const depth3Lists = document.querySelectorAll(".s-depth3")


// 각 1차 메뉴에 클릭 이벤트 등록
depth1Menu.forEach(menu => {
  menu.addEventListener("click", () => {
    // 현재 클릭된 메뉴의 다음 형제 요소가 서브메뉴임
    const depth2list = menu.nextElementSibling
    if (depth2list) { // 서브메뉴가 있는 경우
      
      //해당 요소에 실제로 브라우저가 적용한 모든 CSS 스타일을 계산해서 가져옵니다.
      const display = window.getComputedStyle(depth2list).display
      // console.log(display)
      if (display === "none") {  // 메뉴가 닫혀 있으면 열기
        depth2Lists.forEach(list => {
          if (list === depth2list) {
            // 현재 클릭된 메뉴에만 show 클래스 추가
            depth1Menu.forEach(m => m.classList.remove("show"));
            // 2) 현재 클릭된 메뉴에만 'show' 클래스 추가
            menu.classList.add("show")
            // 3) 해당 서브메뉴 열기
            list.style.display = "block";
            list.style.maxHeight = depth2list.scrollHeight + "px";
            
            // )
          } else {
            // 나머지 서브메뉴는 닫기
            list.style.maxHeight = null
            setTimeout(function () {
              list.style.display = "none"
            }, 300)
            
            depth3Lists.forEach(list => {
              list.style.maxHeight = null;
              list.style.display = "none";
            });
            depth2Menu.forEach(list => list.classList.remove("show"))
          }
        })
      } else {
        //모든 list 숨기기
        depth2list.style.maxHeight = null
        setTimeout(function () {
          depth2list.style.display = "none"
        }, 300)
        // show 클래스 제거
        menu.classList.remove("show");
      }
    } else {
      // 서브메뉴가 없는 메뉴 클릭 시 → 모든 서브메뉴 닫기
      depth2Lists.forEach(list => {
        list.style.maxHeight = null
        setTimeout(function () {
          list.style.display = "none"
        }, 300)
      })
      // show 클래스 제거
      depth1Menu.forEach(m => m.classList.remove("show"));
    }
  })
})

// 각 2차 메뉴에 클릭 이벤트 등록
depth2Menu.forEach(menu => {
  menu.addEventListener("click", (e) => {
    // 현재 클릭된 메뉴의 다음 형제 요소가 서브메뉴임
    const depth3 = menu.nextElementSibling;
    const depthParent = menu.closest(".depth2-wrap2");
    // console.log(depthParent)
    if (depth3 && depth3.classList.contains("s-depth3")) {
      
      const display = window.getComputedStyle(depth3).display;
      // console.log(display)
      if (display === "none") {  // 메뉴가 닫혀 있으면 열기
        depth3Lists.forEach(list => {
          if (list === depth3) {
            depth2Menu.forEach(m => m.classList.remove("show"));
            menu.classList.add("show");
            
            depth3.style.display = "block";
            depth3.style.maxHeight = depth3.scrollHeight + "px";
            depthParent.style.maxHeight = "none"
          } else {
            list.style.maxHeight = null;
            setTimeout(() => {
              list.style.display = "none";
            }, 300);
          }
        });
        
        // )
      } else {
        // 나머지 서브메뉴는 닫기
        depth3.style.maxHeight = null;
        setTimeout(() => {
          depth3.style.display = "none";
        }, 300);
        menu.classList.remove("show");
      }
    }
  });
});

const sCbtn = document.querySelector(".s-cBtn") //닫기버튼
const sMenu = document.querySelector(".s-menu") //작은화면 사이드메뉴
const menuBtn2 = document.querySelector(".menu-btn2 img") //작은화면 헤더 메뉴아이콘

//메뉴버튼 클릭시 이벤트
menuBtn2.addEventListener("click", () => {
  sMenu.style.display = "block"
  setTimeout(() => {
    sMenu.style.width = "100%"
  }, 10)
})

//닫기버튼
sCbtn.addEventListener("click", () => {
  sMenu.style.width = 0;
  setTimeout(() => {
    sMenu.style.display = "none"
  }, 300)
})


//hover시 상단메뉴 탭
const hoverList = document.querySelectorAll(".h-list > li")
const fadeMenu = document.querySelectorAll(".h-depth3")
const img = document.getElementById("hoverImg");
const hoverDepth1 = document.querySelector(".hover-depth1")

// hoverList.forEach(list => {
  //   list.addEventListener("mouseenter",() => {
    //     fadeMenu.forEach(sub => {
      //       sub.style.display = "block";
      //     })
      //   })
      // })
      
      hoverList.forEach((list, index) => {
        list.addEventListener("mouseenter", () => {
          if (list.dataset.img) {
      img.src = list.dataset.img;
      img.classList.add('show');
    }
    fadeMenu.forEach((sub, subIndex) => {
      sub.style.display = (index === subIndex) ? "block" : "none";
    });
  });
});

container.addEventListener("mouseleave", () => {
  container.style.maxHeight = "0px";
  fadeMenu.forEach(menu => menu.style.display = "none");
  img.classList.remove('show');
});

// 상단 메뉴 탭 클릭 로직 추가
const btnList = document.querySelectorAll(".menu-list > li > a");
const part1 = document.querySelector(".depth2-wrap2.part1");
const part2 = document.querySelector(".hover-depth2");
const part3 = document.querySelector("#hover-smegazine");

btnList.forEach((btn, index) => {
  btn.addEventListener("mouseenter", () => {
    // e.preventDefault();
    container.style.maxHeight = container.scrollHeight + "px"
    // 1. 모든 버튼에서 'show' 제거
    btnList.forEach(b => b.classList.remove("show"));
    
    // 2. hover된 버튼에만 'show' 추가
    btn.classList.add("show");
    
    if (index === 0) { // btn1
      part1.style.display = "block";
      part2.style.display = "none";
      part3.style.display = "none";
    } else if (index === 1) { // btn2
      part1.style.display = "none";
      part2.style.display = "block";
      part3.style.display = "none";
    } else if (index === 2 ) { //btn3
      part1.style.display = "none";
      part2.style.display = "none";
      part3.style.display = "block";
    }
  });
});

// document.querySelector("#hover-menu").addEventListener("mouseleave", () => {
  //   btnList.forEach((btn) => {
    //     btn.classList.remove("show");    
    //   })
    //   part1.style.display = "none";
    //   part2.style.display = "none";
    //   container.style.display = "none"
    // });
    
    
    //두번째 탭
const hoverTab = document.querySelectorAll(".hover-depth2 .depth2-menu"); //li
const hoverimage = document.getElementById("hoverImage2");

hoverTab.forEach((tab, i) => {
  tab.addEventListener("mouseenter", () => {
    hoverimage.src = `image/col${i + 1}.jpg`
  })
})




