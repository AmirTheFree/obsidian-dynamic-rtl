// In the name of Allah

import { Plugin, MarkdownView, Editor } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {

		// Reading view (for tables & callouts this fixes the editor too)
		this.registerMarkdownPostProcessor((container, context) => {
			container.querySelectorAll('p,div.cm-line,div.callout-title-inner,h1,h2,h3,h4,h5,h6').forEach(element => {
				element.setAttribute('dir', 'auto');
			});
			container.querySelectorAll('table,ol,ul,pre').forEach(element => {
				element.parentElement?.setAttribute('dir', 'auto');
			});
		});
	}
}