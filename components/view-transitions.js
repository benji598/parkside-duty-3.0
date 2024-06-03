const ViewTransitionsTemplate = document.createElement('template');
ViewTransitionsTemplate.innerHTML = /*html*/ `





<slot></slot>

`;

class ViewTransitions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(ViewTransitionsTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        // Initial setup if content is already present
        this.setupViewTransitions();
    }

    setupViewTransitions() {
        window.addEventListener('pagereveal', async (e) => {
            console.log(e);

            if (e.viewTransition) {
                // Same-origin transition logic
                if (!navigation.activation?.from) {
                    e.viewTransition.skipTransition();
                    return;
                }

                const transitionClass = this.determineTransitionClass(navigation.activation.from, navigation.currentEntry);
                // Apply the transition class to the .transitions div within the Shadow DOM
                document.documentElement.classList.add(transitionClass);
                // this.dataset.transition = transitionClass;
                // document.documentElement.dataset.transition = transitionClass;

                try {
                    await e.viewTransition.finished;
                } catch (error) {
                    console.error('Error in same-origin transition:', error);
                } finally {
                    // Remove the transition class after completion or error
                    // delete this.dataset.transition;
                    // delete document.documentElement.dataset.transition;
                    document.documentElement.classList.remove(transitionClass);
                }
            } else {
                // Handle reload and cross-origin transitions
                // if (navigation.activation.navigationType == 'reload') {
                // // ... (your existing reload logic)
                // } else {
                // // Cross-origin transition (add a default animation)
                // this.shadowRoot.querySelector('.transitions').classList.add('fade-in'); // Or a custom class
                // const t = document.startViewTransition(() => {});
                // try {
                // await t.finished;
                // } catch (e) {
                // console.error('Error in cross-origin transition:', e);
                // }
                // finally {
                // this.shadowRoot.querySelector('.transitions').classList.remove('fade-in');
                // }
                // }
            }
        });
    }

    determineTransitionClass = (oldNavigationEntry, newNavigationEntry) => {
        const currentURL = new URL(oldNavigationEntry.url);
        const destinationURL = new URL(newNavigationEntry.url);

        const currentPathname = currentURL.pathname.replace('/index.php', '/');
        const destinationPathname = destinationURL.pathname.replace('/index.php', '/');

        console.log(currentPathname);

        if (currentPathname === destinationPathname) {
            return 'reload';
        } else if (currentPathname === '/' && destinationPathname.includes('/duty.php')) {
            return 'push';
        } else if (currentPathname.includes('/duty.php') && destinationPathname === '/') {
            return 'pop';
        } else if (currentPathname.includes('/duty.php') && destinationPathname.includes('/duty.php')) {
            if (this.isUABackButton(oldNavigationEntry, newNavigationEntry)) {
                return 'pop';
            } else {
                return 'push';
            }
        } else {
            console.warn('Unmatched Route Handling!');
            console.log({
                currentPathname,
                destinationPathname,
            });
            return 'none';
        }
    };

    // Determine if the UA back button was used to navigate
    isUABackButton = (oldNavigationEntry, newNavigationEntry) => {
        return newNavigationEntry.index < oldNavigationEntry.index;
    };
    isUAForwardButton = (oldNavigationEntry, newNavigationEntry) => {
        return newNavigationEntry.index > oldNavigationEntry.index;
    };
}
customElements.define('view-transitions', ViewTransitions);