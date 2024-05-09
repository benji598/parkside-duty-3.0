<?php require 'db.php'; require 'functions.php'; ?>

<?php
$pageSpecificScripts = [
    "icon/send-icon.js", 
    "icon/whatsapp-icon.js", 
    "icon/sms-icon.js",
    "components/name-send-title.js",
    "components/name-holder.js",
    "components/send-btn.js",
    "components/name-list-layout.js",
    "components/form-container.js",
    "components/send-options-content.js",
    "components/slide-up-modal.js",
];

// Include the header file
include 'header.php'; 
?>
<html class="next">

<body>

    <header-info subtitle="Send a Reminder"></header-info>
    <name-send></name-send>
    <main-wrapper>
        <duty-name></duty-name>
        <name-list-layout id="nameListLayout"></name-list-layout>


        <?php if ($isAdmin): ?> <?php endif; ?>

        <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>

    </main-wrapper>
</body>

</html>