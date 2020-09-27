import { Selector } from 'testcafe';
    
fixture `Frontend tests by Igor`
    .page `http://localhost:3000`;

/* 0
test('Submit all required fields and login', async t => {
    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;

    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;

    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .expect(submitButtonExists).ok()
        .click(submitButton)
});
*/

//1
test('Logout', async t => {

    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;

    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;

    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       

    const logoutButton = Selector('.logout-button');
    const logoutButtonExists = logoutButton.exists;

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .expect(submitButtonExists).ok()
        .click(submitButton)

        .expect(logoutButtonExists).ok()
        .click(logoutButton)
});

//2
test('Edit and save profile description', async t => {

    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;

    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;

    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       

    const selfAvatar = Selector('.avatar');
    const selfAvatarExists = selfAvatar.exists;

    const editButton = Selector('#edit-button');
    const editButtonExists = editButton.exists;

    const descriptionInput = Selector('#description-input');
    const descriptionInputExists = descriptionInput.exists;

    const applyChangesButton = Selector('#apply');
    const applyChangesButtonExists = applyChangesButton.exists;

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .expect(submitButtonExists).ok()
        .click(submitButton)

        .expect(selfAvatarExists).ok()
        .click(selfAvatar)

        .expect(editButtonExists).ok()
        .click(editButton)

        .expect(descriptionInputExists).ok()
        .click(descriptionInput)
        .pressKey('ctrl+a delete')
        .typeText(descriptionInput, "Hello! I'm testing features using TestCafe.")

        .expect(applyChangesButtonExists).ok()
        .click(applyChangesButton)
});

//3
test('Follow/Unfollow another user', async t => {

    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;

    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;

    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       


    const userAvatar = Selector('.avatar-miniature');
    const userAvatarExists = userAvatar.exists;

    const followButton = Selector('#follow-button');
    const followButtonExists = followButton.exists;

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)
    
        .expect(submitButtonExists).ok()
        .click(submitButton)

        .expect(userAvatarExists).ok()
        .click(userAvatar)

        .expect(followButtonExists).ok()
        // .click(followButton)

});

//4
test('Visit an activity of an user you follow', async t => {

    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;

    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;

    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       

    const ActivityLink = Selector('.action a');
    const ActivityLinkExists = ActivityLink.exists;

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .expect(submitButtonExists).ok()
        .click(submitButton)

        .expect(ActivityLinkExists).ok()
        .click(ActivityLink)
});

//5
test('Search for a movie by name, using the top searchbar', async t => {
    const username = 'rusro';
    const password = 'password';

    const userNameInput = Selector('#name');
    const userNameInputExists = userNameInput.exists;
    
    const passwordInput = Selector('#password');
    const passwordInputExists = passwordInput.exists;
    
    const submitButton = Selector('#submit');
    const submitButtonExists = submitButton.exists;       

    const movieName = 'Berserk';

    const searchInput = Selector('.search-bar input');
    const searchInputExists = searchInput.exists;

    const searchButton = Selector('.search-bar button');
    const searchButtonExists = searchButton.exists;

    await t
        .expect(userNameInputExists).ok()
        .typeText(userNameInput, username)
        .expect(userNameInput.value).eql(username)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .expect(submitButtonExists).ok()
        .click(submitButton)

        .expect(searchInputExists).ok()
        .typeText(searchInput, movieName)
        .expect(searchInput.value).eql(movieName)

        .expect(searchButtonExists).ok()
        .click(searchButton)
});