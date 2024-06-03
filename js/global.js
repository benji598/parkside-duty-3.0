document.addEventListener('click', (e) => {
  if (e.target.matches('A')) {
    if (navigation.canGoBack) {
      navigation.back();
    }
  }
});

// MPA View Transitions!
window.addEventListener('pagereveal', async (e) => {
  console.log(e);

  // There is an automatic viewTransition, so the user comes from the same origin
  if (e.viewTransition) {
    if (!navigation.activation?.from) {
      e.viewTransition.skipTransition();
      return;
    }

    const transitionClass = determineTransitionClass(navigation.activation.from.url, navigation.currentEntry.url);
    console.log(transitionClass);
    document.documentElement.classList.add(transitionClass);

    await e.viewTransition.finished;
    delete document.documentElement.classList.remove(transitionClass);
  }

  // User comes from different origin or did a reload
  else {
    // Do a reload animation
    if (navigation.activation.navigationType == 'reload') {
      document.documentElement.dataset.transition = 'reload';
      const t = document.startViewTransition(() => {
        // NOOP
      });
      try {
        await t.finished;
        delete document.documentElement.dataset.transition;
      } catch (e) {
        console.log(e);
      }
      return;
    }
  }
});

const determineTransitionClass = (oldNavigationEntry, newNavigationEntry) => {
  const currentURL = new URL(oldNavigationEntry);
  const destinationURL = new URL(newNavigationEntry);

  const currentPathname = currentURL.pathname.replace('/index.php', '/');
  const destinationPathname = destinationURL.pathname.replace('/index.php', '/');

  if (currentPathname === destinationPathname) {
    return 'reload';
  } else if (currentPathname === '/' && destinationPathname.includes('/duty.php')) {
    return 'push';
  } else if (currentPathname.includes('/duty.php') && destinationPathname === '/') {
    return 'pop';
  } else if (currentPathname.startsWith('/splash.php') && destinationPathname === '/') {
    return 'pop';
  } else if (currentPathname.includes('/duty.php') && destinationPathname.includes('/duty.php')) {
    if (isUABackButton(oldNavigationEntry, newNavigationEntry)) {
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
const isUABackButton = (oldNavigationEntry, newNavigationEntry) => {
  return newNavigationEntry.index < oldNavigationEntry.index;
};

// Determine if the UA forward button was used to navigate
const isUAForwardButton = (oldNavigationEntry, newNavigationEntry) => {
  return newNavigationEntry.index > oldNavigationEntry.index;
};
