# ACTIVITY 1 January 21, 2026

🔹 BEYOND Landing Page.

🔹 Description
BEYOND is a community-focused landing page for "The Visual Collective," designed to connect global visionaries in branding, print, and digital art. It serves as a promotional hub for sharing resources (like the Adobe Creative Suite) and showcasing avant-garde visual works. The project solves the problem of isolation in the creative field by offering a centralized, high-contrast digital space for collaboration and portfolio display.

🔹 Technologies Used
* HTML5
* CSS3
* JavaScript

🔹 Features
* Featured Works Gallery: A responsive grid layout displaying poster designs and products (e.g., "Pretty Women," "Off White™ for Nike") with a clear hierarchy.
* Interactive Hover Effects: Dynamic overlays on project cards that reveal numbers and details (01–08) upon user interaction.
* Community CTA: A dedicated "Get Started" call-to-action section inviting users to join the collective and access shared tools.

🔹 AI Assistance Disclosure (Required)
Did you use AI tools? Yes

Details:
I used Gemini to help structure the custom JavaScript cursor logic (specifically the interpolation math for the lens) and to debug the specific opacity requirements for the "See More" project card. I used Claude to refine my program and to structure the design layout. All the layout ideas and styling are by me.

🔹 Learning Reflection (Short)
I learned how to effectively place images, set background colors, and implement CSS mouse hover effects to enhance user interaction. The most challenging part was balancing the style of the "See More" card to ensure it fit seamlessly with the rest of the grid.

---
# Profile Page ACTIVITY February 4, 2026
🔹 Profile + Settings Pages (UI Navigation Challenge)
🔹 Description Extended the LUSTRE portfolio project by adding Profile and Settings pages to create a complete multi-page navigation system. The Profile page serves as a user dashboard displaying personal information, account details, and an "About Me" section with a glass-morphism design aesthetic. The Settings page provides a configuration interface for account management, including email/address changes, password updates, theme selection, and notification preferences. This activity focuses on building consistent UI design across multiple pages while maintaining the brutalist aesthetic established in the landing page.
🔹 Technologies Used

HTML5
CSS3
JavaScript
🔹 Features
Multi-page Navigation: Seamless navigation flow between index → login → profile → settings with proper back/logout links.
Dashboard-style Profile Card: Features user avatar with status indicator, personal information (name, role, email, address), and account details section.
Glass-morphism Design: Transparent card components with backdrop blur effects that complement the background grid overlay.
Settings Configuration UI: Comprehensive form interface for email, address, and password changes with future-feature field notes, plus theme selector and notification checkboxes.
Consistent Custom Cursor: Ghost cursor system (dot + lens) works across all pages with form-mode detection for precision input.
🔹 AI Assistance Disclosure (Required) Did you use AI tools? Yes
Details: I used Claude to help me with structuring the code and linking the pages together for proper navigation flow. All design ideas, styling decisions, color schemes, and refinements are by me.
🔹 Learning Reflection (Short) I learned how to create consistent navigation flows across multiple pages and maintain design cohesion using shared CSS variables. The most challenging part was implementing the glass-morphism effect while keeping text readable against the dynamic background. I gained experience in structuring dashboard-style layouts with card components and form elements.

---

# Validation Rule ACTIVITY March 4, 2026

🔹 Client-Side Form Validation

🔹 Description
Extended the LUSTRE portfolio project by implementing client-side validation across the Login, Sign Up, and Settings pages using vanilla JavaScript. The validation prevents form submission when required fields are empty or incorrectly formatted, and provides real-time inline feedback to guide the user. All logic was added to the existing `script.js` file without introducing any external libraries, keeping the project lightweight and consistent with its previous structure.

🔹 Technologies Used
* HTML5
* CSS3
* JavaScript

🔹 Features
* Login Validation: Checks that the email field is present and properly formatted, and that the password field is not empty before allowing navigation to the profile page.
* Sign Up Validation: Validates name (minimum 2 characters), email format, password strength (minimum 8 characters, at least 1 uppercase letter, at least 1 number), and confirm password match.
* Settings Validation: Email is validated only when a value is entered. If any password field is touched, all three (current, new, confirm) become required and are checked for strength and match.
* Inline Error Messages: Red error text appears beneath each invalid field in uppercase with letter-spacing, consistent with the site's design language.
* Success State: Valid fields turn neon green to give positive confirmation.
* Toast Notifications: A sliding toast message appears at the bottom of the screen for both error and success states.
* Blur-based Live Feedback: Validation triggers as users tab between fields, not just on submit.

🔹 AI Assistance Disclosure (Required)
Did you use AI tools? Yes

Details:
I used Claude to help implement the validation logic in `script.js` and wire up the submit buttons in `login.html`, `signup.html`, and `settings.html`. All design decisions, the overall aesthetic, and the site structure are by me.

🔹 Learning Reflection (Short)
I learned how to intercept form submission events in JavaScript and provide meaningful feedback without reloading the page. The most challenging part was making the validation modular across multiple pages while keeping everything in a single `script.js` file. I also gained experience in designing error states that feel consistent with an existing visual system rather than just using default browser alerts.
