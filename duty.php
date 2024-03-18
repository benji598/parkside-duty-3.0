<?php require 'db.php'; require 'functions.php'; include 'header.php'; ?>


<body>
    <header-info id="dutyHeader" title="" subtitle="Duty Details"></header-info>
    <name-send></name-send>
    <name-list-layout id="nameListLayout"></name-list-layout>

    <?php if ($isAdmin): ?> <?php endif; ?>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>