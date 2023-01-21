# :baby_symbol::baby_bottle::memo:PregnancyDiary
PregnancyDiary is a small SPA created with Asp.Net Core with ReactJS template.

## :memo: Description
PregnancyDiary can be used to present particular diary during your pregnancy.

#### :white_check_mark: Users futures: 

    - register as regular user, login and logout. 
    - see all articles.
    - see articles in current category.
    - see all articles, filter and order them by different criteria.
    - search article by name.
    - see article's detail information.
    - like/dislike article.
    - write comments to article.
    - have area with his favourite articles.
    - create diaries.
    - see all his own diaries, update and delete them.
    - see diary's details.
    - add new week in his diary.
    - see all weeks, update and delete them.
    - see week's details.
    - add new memory to the week.
    - see all his memories, update and delete them.
    - have button "Baby is born"
    - see baby's details, update and delete baby.
      
#### :white_check_mark: Admin futures: 

    - all user's futures.
    - admin's dashboard:  
      * add, edit and delete categories.
      * add, edit and delete articles.

## :hammer_and_pick: Build with

 - CSharp
 
 - .NET Core 5.0
 
 - Dependency Injection

 - Repository Pattern

 - WebApi
 
 - AutoMapper

 - Newtonsoft.Json

 - Bootstrap

 - MSSQL Server 

 - Entity Framework Core 5.0
 
 - JavaScript
 
 - ReactJS
 
 - React-Router-Dom

 - JEST

 - React Testing Library
 
 - Lazy Loading
 
 - toastr

 - Immer

 - ShortId

 - FontAwesome

 - CSS

 - HTML5

## :gear: Application Configurations
 #### To start server: 
 
 1. Create appsettings.json file in Data.PregnancyDiary.Data. 

    - Add your Connection String 

 2. Create one more appsettings.json file in Web.PregnancyDiary.WebApi. 

    - Add your Connection String

    - Add your own secret (needed for generating JWT for authentication) in format: "JwtSettings": { "Secret": "Your secret here" }
