// In the name of Allah

import { MarkdownPostProcessorContext, Plugin } from 'obsidian';

function isRtlChar(c: string): boolean {
	return /[\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(c);
}

export default class DynamicRTL extends Plugin {

	async onload() {

		this.registerMarkdownPostProcessor((container: HTMLElement, context: MarkdownPostProcessorContext) => {
			// Fixes the Reading view (for tables & callouts this fixes the editor too)
			container.querySelectorAll('p,div.cm-line,h1,h2,h3,h4,h5,h6' + ',div.callout-title-inner').forEach(element => {
				element.setAttribute('dir', 'auto');
			});
			container.querySelectorAll('table,ol,ul,pre').forEach((element: HTMLElement) => {
				element.parentElement?.setAttribute('dir', 'auto');
			});
			// Fixes the Callout title
			container.querySelectorAll('.callout-title').forEach((element: HTMLElement) => {
				if (isRtlChar(element.innerText.charAt(0))) {
					element.style.direction = 'rtl';
				}
			});
			// Fixes the qoutes border direction in RTL texts
			container.querySelectorAll('blockquote').forEach((element: HTMLElement) => {
				if (isRtlChar(element.innerText.charAt(1))) {
					element.style.borderLeft = '0';
					element.style.borderRight = 'var(--blockquote-border-thickness) solid var(--blockquote-border-color)';
					element.style.marginRight = '23px';
					const innerContent = element.querySelector('p');
					if (innerContent) {
						innerContent.style.marginRight = '23px';
					}
				}
			});
			// Fixes the bullet points problem & bidirectional problem in reading mode
			container.querySelectorAll('li').forEach(element => {
				if (isRtlChar(element.innerText.charAt(0))) {
					element.querySelectorAll('.list-bullet').forEach((bullet: HTMLElement) => {
						bullet.style.float = 'right';
						bullet.classList.add('rtl-bullet-point');
					});
				} else {
					element.style.textAlign = 'left';
				}
			});
			// Moves collapse icon to the right for RTL headings
			container.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((element: HTMLElement) => {
				if (isRtlChar(element.innerText.charAt(0))) {
					const icon = element.querySelector('div');
					if (icon) {
						icon.style.marginRight = '-22px';
						icon.style.float = 'right';
					}
				}
			});
			// Moves list indent border to right for RTL lists (Reading view)
			container.querySelectorAll('ol,ul').forEach((element: HTMLElement) => {
				if (isRtlChar(element.innerText.charAt(1))) {
					element.classList.add('rtlList');
				}
			});
			// Fixes the bidi pargraph problem in reading mode
			container.querySelectorAll('p').forEach((element: HTMLParagraphElement) => {
				let biDiParagraph: string = '';
				element.innerHTML.split('<br>').forEach((line: string) => {
					biDiParagraph += `<div dir="auto">${line}</div>`;
				});
				element.innerHTML = biDiParagraph;
			});
			// Fixes the bidi code block problem in reading mode
			container.querySelectorAll('code').forEach((element: HTMLElement) => {
				let biDiCode: string = '';
				element.innerHTML.split('\n').forEach((line: string, index: number, array: Array<string>) => {
					if (index != array.length - 1) {
						biDiCode += `<div dir="auto">${line}</div>`;
					}
				});
				element.innerHTML = biDiCode;
			});
			// Moves copy button for RTL code blocks to the left in reading view
			container.querySelectorAll('pre').forEach((element: HTMLPreElement) => {
				if (isRtlChar(element.innerText.charAt(0))) {
					element.classList.add('rtlPre');
				}
			});
		});

	}

}
