<?php require 'db.php'; require 'functions.php'; include 'header.php'; ?>
<html class="next">

<head>
    <!-- icon -->
    <script src="icon/send-icon.js" defer></script>
    <script src="icon/whatsapp-icon.js" defer></script>
    <script src="icon/sms-icon.js" defer></script>

    <!-- component -->
    <script src="components/name-send-title.js" defer></script>
    <script src="components/name-list-layout.js" defer></script>
    <script src="components/name-holder.js" defer></script>
    <script src="components/send-btn.js" defer></script>
    <script src="components/form-container.js" defer></script>
    <script src="components/send-options-content.js" defer></script>
    <script src="components/slide-up-modal.js" defer></script>
</head>

<body>
    <header-info subtitle="Send a Reminder"></header-info>
    <name-send></name-send>
    <main>
        <duty-name></duty-name>
        <name-list-layout id="nameListLayout"></name-list-layout>
    </main>

    <?php if ($isAdmin): ?> <?php endif; ?>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>