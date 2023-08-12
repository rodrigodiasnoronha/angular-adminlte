import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  abrirNavbar: boolean = false

  toggleNavbar() {
    // // var scroll = $(window).scrollTop();
    this.abrirNavbar = !this.abrirNavbar

    let el = document.getElementById("navigation")
    if (!this.abrirNavbar) {
      this.slideUp(el)
    } else {
      this.slideDown(el)
    }
  }

  // oculta a navbar no mobile
  slideDown(element: any) {
    element.style.display = "block";
    const height = element.clientHeight;
    element.style.height = "0";

    // Animate the height from 0 to the original height
    const animation = element.animate(
      { height: [0, height + "px"] },
      { duration: 300, easing: "ease" }
    );

    animation.onfinish = function () {
      element.style.height = "auto"; // Set height back to auto after animation
    };
  }

  // abre a navbar no mobile
  slideUp(element: any) {
    const height = element.clientHeight;

    // Animate the height from the current height to 0
    const animation = element.animate(
      { height: [height + "px", 0] },
      { duration: 300, easing: "ease" }
    );

    animation.onfinish = function () {
      element.style.display = "none";
    };
  }
}
