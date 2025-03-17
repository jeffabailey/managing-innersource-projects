// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> Summary</a></li><li class="chapter-item expanded "><a href="introduction/introduction.html"><strong aria-hidden="true">2.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="introduction/scenarios.html"><strong aria-hidden="true">2.1.</strong> Scenarios</a></li><li class="chapter-item expanded "><a href="introduction/framework.html"><strong aria-hidden="true">2.2.</strong> Framework</a></li><li class="chapter-item expanded "><a href="introduction/authors.html"><strong aria-hidden="true">2.3.</strong> Authors and Reviewers</a></li></ol></li><li class="chapter-item expanded "><a href="infrastructure/infrastructure.html"><strong aria-hidden="true">3.</strong> Infrastructure</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="infrastructure/basics.html"><strong aria-hidden="true">3.1.</strong> Basic Infrastructure</a></li><li class="chapter-item expanded "><a href="infrastructure/assessment.html"><strong aria-hidden="true">3.2.</strong> Comparing How Inner-Sourced Your Infra Is</a></li><li class="chapter-item expanded "><a href="infrastructure/authors.html"><strong aria-hidden="true">3.3.</strong> Authors and Reviewers</a></li></ol></li><li class="chapter-item expanded "><a href="measuring/measuring.html"><strong aria-hidden="true">4.</strong> What, When and How to Measure</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="measuring/goals.html"><strong aria-hidden="true">4.1.</strong> Goals using Metrics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="measuring/use_gqm.html"><strong aria-hidden="true">4.1.1.</strong> Use Goals, Questions, and Metrics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="use_gqm/goals/index.html"><strong aria-hidden="true">4.1.1.1.</strong> Goals</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="measuring/goals/reduce-duplication.html"><strong aria-hidden="true">4.1.1.1.1.</strong> Reduce Duplication</a></li></ol></li><li class="chapter-item expanded "><a href="use_gqm/questions/index.html"><strong aria-hidden="true">4.1.1.2.</strong> Questions</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="measuring/questions/who-uses.html"><strong aria-hidden="true">4.1.1.2.1.</strong> Who Uses</a></li></ol></li><li class="chapter-item expanded "><a href="use_gqm/metrics/index.html"><strong aria-hidden="true">4.1.1.3.</strong> Metrics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="measuring/metrics/usage-count.html"><strong aria-hidden="true">4.1.1.3.1.</strong> Usage Count</a></li></ol></li></ol></li></ol></li><li class="chapter-item expanded "><a href="measuring/areas.html"><strong aria-hidden="true">4.2.</strong> Areas of Analysis</a></li><li class="chapter-item expanded "><a href="measuring/gqm.html"><strong aria-hidden="true">4.3.</strong> Goal-Question-Metric Approach</a></li><li class="chapter-item expanded "><a href="measuring/strategy.html"><strong aria-hidden="true">4.4.</strong> Strategy</a></li><li class="chapter-item expanded "><a href="measuring/metrics.html"><strong aria-hidden="true">4.5.</strong> Examples of Interest</a></li><li class="chapter-item expanded "><a href="measuring/references.html"><strong aria-hidden="true">4.6.</strong> References</a></li><li class="chapter-item expanded "><a href="measuring/authors.html"><strong aria-hidden="true">4.7.</strong> Authors and Reviewers</a></li></ol></li><li class="chapter-item expanded "><a href="governance/governance.html"><strong aria-hidden="true">5.</strong> Governance</a></li><li class="chapter-item expanded "><a href="tooling/innersource-tooling.html"><strong aria-hidden="true">6.</strong> Tooling</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tooling/github-strategy.html"><strong aria-hidden="true">6.1.</strong> GitHub Strategy</a></li><li class="chapter-item expanded "><a href="tooling/github-configuration.html"><strong aria-hidden="true">6.2.</strong> GitHub Configuration</a></li><li class="chapter-item expanded "><a href="tooling/gitlab-strategy.html"><strong aria-hidden="true">6.3.</strong> GitLab Strategy</a></li><li class="chapter-item expanded "><a href="tooling/gitlab-configuration.html"><strong aria-hidden="true">6.4.</strong> GitLab Configuration</a></li><li class="chapter-item expanded "><a href="tooling/authors.html"><strong aria-hidden="true">6.5.</strong> Authors and Reviewers</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
