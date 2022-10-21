// In the name of Allah

import { Plugin } from 'obsidian';

export default class DynamicRTL extends Plugin {

	async onload() {

		const chars = ['ا','ب','پ','ت','ث','ج','چ','ح','خ','س','ش','د','ذ','ر','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ک','گ','ل','م','ن','و','ه','ی','۱','۲','۳','۴','۵','۶','۷','۸','۹','ي','ئ','آ','ك','ء','ؤ','إ','أ','ة'];

		this.registerMarkdownPostProcessor((container, context) => {
			// Fixes the Reading view (for tables & callouts this fixes the editor too)
			container.querySelectorAll('p,div.cm-line,h1,h2,h3,h4,h5,h6' + 'div.callout-title-inner').forEach(element => {
				element.setAttribute('dir', 'auto');
			});
			container.querySelectorAll('table,ol,ul,pre').forEach(element => {
				element.parentElement?.setAttribute('dir', 'auto');
			});
			// Fixes the Callout title
			container.querySelectorAll('.callout-title').forEach(element => {
				if (chars.includes(element.innerText.charAt(0))) {
					element.style.direction = 'rtl';
				}
			});
			// Fixes the qoutes border direction in RTL texts
			container.querySelectorAll('blockquote').forEach(element => {
				if (chars.includes(element.innerText.charAt(1))) {
					element.style.borderLeft = '0';
					element.style.borderRight = 'var(--blockquote-border-thickness) solid var(--blockquote-border-color)';
					element.style.marginRight = '23px';
					element.querySelector('p').style.marginRight = '23px';
				}
			});
			// Fixed the bullet points problem in reading mode
			container.querySelectorAll('ul').forEach(element => {
				if (chars.includes(element.innerText.charAt(1))) {
					element.querySelectorAll('.list-bullet').forEach(bullet => {
						bullet.style.float = 'right';
						bullet.classList.add('rtl-bullet-point');
					});
				}
			});
		});

	}
	
}
