# 📺 ShowTime - A Community Driven TV Guide 📺
![alt text](https://i.imgur.com/R8SHGSJ.png)

## Get started

Open the following two Heroku Sites in the **following order**:

`Note`: Since we were usually angular, we were having some issues running both angular/express on the same server. We had to use two Heroku servers as a result. (You need to open the backend first, because Heroku snoozes the server if it has been inactive for some time)

1. https://show-time-309.herokuapp.com [backend]
2. https://show-time-front.herokuapp.com [frontend]

## Creating an admin user

If you wish to create/register an `admin user` directly for yourself, use the following endpoint:

- https://show-time-front.herokuapp.com/register/admin

## List of Users in DB

### Admins:

1) username: `superadam`
​    password: `helloadam`

2) username: `superbob`
​    password: `hellobob`

### Regular Users:

1) username: `karlcui`
​    password: `hellokarlcui`

2) username: `justin`
​    password: `hellojustin`

3) username: `george`
​    password: `hellogeorge`

4) username: `sohail`
​    password: `hellosohail`

## Sample Workflow:

### Home Page Interactions:

1. Login as any of the **regular** users: ie.

   - Username: `justin`
   - Password: `hellojustin`

2. Hit the profile page (`justin`) in the top right corner, to the left of the `Log out` button

   - Can change any info you’d like and then hit `Confirm changes`
   - **note**: currently we cannot change the display picture as we are unable to save the images in a backend server

3. Head back to the `Home` page

   a) You can click the `edit` button on a show to change its title, show image, description, URL link, or its airing date

   b) You can click on the show’s poster image and view a detailed description of each show

   - From here, you can directly head to the show’s  
   - You can add <u>new ratings</u> at the bottom (⭐to⭐⭐⭐⭐⭐) and the status of your <u>progress</u> with the show (`Completed, Planning, Current, Dropped, Paused`)
   - You can add a review to the show as well which you can view after expanding with the `+` button

4. Back on the home page, you can additionally add shows to the user’s associated `My Shows`, which can be viewable by clicking the `My Shows tab` near the top of the page

5. You can also search for the show on each tab using the `Search bar`

### Editing/Adding a show:

1. You can edit a show by hitting `edit`, and likewise, `add a show` by hitting the button next to the search bar.
   - As a **regular user**, any submitted edits or new shows will place the show in an **Unapproved Show tab**, only viewable by **admins**
2. Log out of `justin` and access any **admin account**: ie.
   - Username: `superbob`
   - Password: `hellobob`
3. As an **admin**, you can view the **Unapproved Shows tab** and approve or reject any shows (2 dummy shows, and any additional shows created from any **regular** accounts)
   - Note: admins can directly `edit` or `add` shows without needing an approval

### User List: (as an admin)

1. As an `admin`, you can:
   - View the list of all users and promote **regular users** to **admins**
   - Ban users, that will not allow them to login
