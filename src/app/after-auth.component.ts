import { Component } from '@angular/core';

@Component({
    selector: 'after-auth',
    template: `<div></div>`
})
export class AfterAuth {

    constructor() {
        if (window.opener) window.opener.focus();
        window.close();
    }

}