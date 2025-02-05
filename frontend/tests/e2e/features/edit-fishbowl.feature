Feature: Edit fishbowl
    As a Stooa user
    I can access the fishbowl list page and edit a fishbowl

    Scenario: Logged users can access to fishbowl list
        Given a logged user
        And a list of one fishbowl
        And an updated fishbowl
        When navigates to "/"
        And clicks on "Linwood Hahn" button
        And clicks on "Fishbowl list" link
        And clicks on fishbowl card
        Then sees the fishbowl edit form full of information

    Scenario: Logged users can edit a fishbowl
        Given a logged user
        And a list of one fishbowl
        When navigates to "/fishbowl/list"
        And clicks on fishbowl card
        Then sees the fishbowl edit form full of information
        When modifies the fishbowl "title" writing "Updated fishbowl"
        And modifies the fishbowl "description" writing "Updated description"
        And modifies the fishbowl "day" writing "15/02/2030"
        And modifies the fishbowl "time" writing "10:00"
        And modifies the fishbowl "hours" selecting "04:00"
        And modifies the fishbowl "timezone" selecting "Antarctica/Vostok"
        And modifies the fishbowl "language" selecting "ca"
        And modifies the fishbowl "hasIntroduction" to true
        Given an updated fishbowl
        Then saves the changes
        And sees success messages
        And sees the fishbowl list updated

    Scenario: Logged user sees placeholder when no fishbowl selected
        Given a logged user
        And a desktop computer
        And a list of one fishbowl
        When navigates to "/fishbowl/list"
        Then sees the placeholder area

    Scenario: Logged user clicks on fishbowl that is about to start
        Given a logged user
        And a list of one fishbowl that is about to start
        When navigates to "/fishbowl/list"
        Then clicks on fishbowl card that is about to start
        Then sees a placeholder with Enter Fishbowl button
        And clicks on placeholders Enter Fishbowl link
        And gets redirect to "/fb/test-me-fishbowl"

