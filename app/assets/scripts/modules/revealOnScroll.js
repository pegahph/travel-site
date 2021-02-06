import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class revealOnScroll {
    constructor(els , thresholdPercent){
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = els;
        this.hideInitially();
        this.browserHeight = window.innerHeight;
        this.scrollThrottle = throttle(this.calcCaller , 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll" , this.scrollThrottle);
        window.addEventListener("resize" , debounce(() =>{
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller(){      
        this.itemsToReveal.forEach(el => {
            if(this.isRevealed == false){
                this.calculateIfScrolledTo(el);
            }         
        })
    }

    calculateIfScrolledTo(el){
        if (window.scrollY + this.browserHeight > el.offsetTop){
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if(scrollPercent < this.thresholdPercent){
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;
                if(el.isLastItem){
                    window.removeEventListener("scroll" , this.scrollThrottle);
                }
            }
        }
    }

    hideInitially(){
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item');
            this.isRevealed = false;
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default revealOnScroll;