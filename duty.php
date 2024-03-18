<?php require 'db.php'; require 'functions.php'; include 'header.php'; ?>

<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Duty Details</title>
</head> -->

<body>
    <header-info id="dutyHeader" title="" subtitle="Duty Details"></header-info>
    <name-send></name-send>
    <name-list-layout id="nameListLayout"></name-list-layout>

    <!-- <script>
    const dutyId = new URLSearchParams(window.location.search).get('id');

    fetch(`/api/duty/${dutyId}`)
        .then(response => response.json())
        .then(duty => {

            fetchedDutyDetails = duty;
            const dutyHeader = document.getElementById('dutyHeader');
            dutyHeader.setAttribute('title', duty.name);

            console.log(duty.name)

            // Fetch sub-users after duty details are fetched and stored
            return fetch(`/api/sub-users/${dutyId}`);
        })
        .then(response => response.json())
        .then(subUsers => {

            const nameListLayout = document.getElementById('nameListLayout');
            if (Array.isArray(subUsers)) {
                subUsers.forEach(subUser => {
                    // Create and append name-holder
                    const nameHolder = document.createElement('name-holder');
                    nameHolder.setAttribute('name', `${subUser.firstname} ${subUser.lastname}`);
                    nameListLayout.appendChild(nameHolder);

                    // Create and append send-button
                    const sendButton = document.createElement('send-button');
                    sendButton.setAttribute('firstName', subUser.firstname);
                    sendButton.setAttribute('lastName', subUser.lastname);
                    sendButton.setAttribute('dutyName', fetchedDutyDetails.name);
                    sendButton.setAttribute('number', subUser.phone);
                    sendButton.setAttribute('icon',
                        '<send-icon></send-icon>'
                    ); // Ensure this matches how your component expects to receive and process the icon.
                    sendButton.setAttribute('duty_message', subUser.duty_message);
                    sendButton.setAttribute('cover_message', subUser.cover_message);
                    sendButton.setAttribute('meeting_1', subUser.meeting_1);
                    sendButton.setAttribute('meeting_2', subUser.meeting_2);
                    nameListLayout.appendChild(sendButton);
                });
            } else {
                console.error('Expected sub-users to be an array.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:',
                error); // Debugging: Log any errors caught during the fetch process
        });
    </script> -->

    <?php if ($isAdmin): ?> <?php endif; ?>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>