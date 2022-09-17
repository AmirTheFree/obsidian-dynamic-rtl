// In the name of Allah

import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			element.querySelectorAll('p,div.cm-line,div.callout-title-inner,h1,h2,h3,h4,h5,h6').forEach(e => {
				e.setAttribute('dir','auto');
			});
			element.querySelectorAll('table,ol,ul,pre').forEach(e => {
				e.parentElement?.setAttribute('dir','auto');
			});
		});
	}
}