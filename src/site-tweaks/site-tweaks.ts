import { memberSignupButtonQuotes } from "./member-signup-button-quotes";

/*
//
// Site tweak: Remove underline from links with trailing fragment identifier
// (Inactive, proceeding with "strikethrough" decoration approach because it's cheaper)
//

// Find all links ending with (`$`) a `#no_ul` fragment identifier
const noUnderlineFragmentIdentifier = "#no_ul";

const allNoUnderlineLinks = document.querySelectorAll(`a[href$="${noUnderlineFragmentIdentifier}"]`);

allNoUnderlineLinks.forEach((linkElement) => {
  linkElement.classList.add("no_underline");

  const linkHref = linkElement.getAttribute("href");

  if (linkHref) {
    linkElement.setAttribute("href", linkHref.replace(noUnderlineFragmentIdentifier, ""));
  }
});
*/

//
// Site tweak: Apply "Become a member" button quotes to links
//

{
  // Find all links ending with (`$`) a `#member_signup` fragment identifier
  const fragmentIdentifier = "#member_signup";

  const startingQuoteIndex = Math.floor(Math.random() * memberSignupButtonQuotes.length);

  const buttonLinks = document.querySelectorAll<HTMLLinkElement>(
    `a[href$="${fragmentIdentifier}"]`
  );

  buttonLinks.forEach((linkElement, index) => {
    // Remove fragment from link
    linkElement.href = linkElement.href.replace(fragmentIdentifier, "");

    // Replace content
    const quoteIndex = (startingQuoteIndex + index) % memberSignupButtonQuotes.length;

    linkElement.innerText = memberSignupButtonQuotes[quoteIndex];
  });
}

//
// Site tweak: Apply coloring to navigation bar entries
//

function styleNavigationElement(element: HTMLLinkElement | HTMLSpanElement) {
  const innerText = element.innerText;
  const thePrefix = "The";

  if (!innerText.startsWith(thePrefix)) {
    // Leave element as-is
    return;
  }

  // Reset element content to just "The" prefix
  element.innerText = thePrefix;

  // Add span for remaining inner text wrapped in a class'd <span>
  const remainingInnerText = innerText.substring(thePrefix.length);

  const innerSpan = document.createElement("span");
  innerSpan.appendChild(document.createTextNode(remainingInnerText));
  innerSpan.classList.add("header-nav-word-highlight");

  element.appendChild(innerSpan);
}

{
  // Somewhat fragile matching of SquareSpace 7.1 navigation bar elements
  const topLevelNavigationLinks =
    document.querySelectorAll<HTMLLinkElement>("div.header-nav-item a");

  const nestedNavigationLinks = document.querySelectorAll<HTMLSpanElement>(
    "div.header-nav-folder-item a span.header-nav-folder-item-content"
  );

  topLevelNavigationLinks.forEach(styleNavigationElement);
  nestedNavigationLinks.forEach(styleNavigationElement);
}
