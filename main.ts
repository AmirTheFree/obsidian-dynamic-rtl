import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			element.querySelectorAll('p').forEach(e => {
				e.setAttribute('dir','auto');
			});
		});
	}
}