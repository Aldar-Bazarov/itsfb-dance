// import React from 'react'

// const Events = () => {
//     return (
//         <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//             <rect width="40" height="40" fill="url(#pattern0)" />
//             <defs>
//                 <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
//                     <use xlink:href="#image0_11_141" transform="scale(0.0111111)" />
//                 </pattern>
//                 <image id="image0_11_141" width="90" height="90" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG2UlEQVR4nO2caahWRRjHT2ku2W3R1GyVTNqhiKLyS5aFFkabS5EFBRVifkgTKwqixWtWYn4oiYhMIhOVpMUPgQqVGZFa1pei/VpaVnrLum6/mBrh7fXM/pz3HOX84MKFO/M8/3numTMzz8ycLKupqampqampqampqanZ/wEOAZ4EfgY6gHagR9m6DjiAWexLe9m6DiiAw4BtOYHuSDXcA5gJbGxlN0HAL9ATmAx8APyhf9Tvd6u/Req6nXw2x9hrNNxeRjch0S9wHLAOM2tVmQhd7xvsLQ5uZJPhDvFuUrBf/STbgtwYbO8nGzjTYmu8rx2T8VyK7rZE+tV1lV9fJgXE4imDjT/Vu9vXjsn4ntAGS3Rb0gK9JiDQqwPGjM0GG4t8bIgGWqrbYsBTc6d3mGGbp80bLDbG+NhwOdgd0mCpbouBEgP9tqG+eiUe6mNDOtAi3RYDZbw6gBNNcQAW+mjyEb0rpMFSTxMGPDWrAVdsMAQestS/3kfTgRronnoMcLHWtQgCBgI/GOqrtvb20eQjeuf+9upomPmsTZz5HAF8bLHxSiZFRKBFui2JgW6Ykk1S/1D99HXqld0kjye5N7DKof+aED0usTsCAy3SbREIdCxAd2CZQ/+62HxJUKCBQUV1W+DqsgINHAS85AjyFuBkacddBme/2Cbqsd0WGAZsN/jcI9q4fP+zHUFWk4MrinBsCvReFgBHCvk6Qz8tJr6W8JPjtw9wGTAPN9OygkSohImL74ERiX6OB75z+Jks1KajgNF6p2S1acDPYaF6tUhoCMm/NqNyIs/EzCv5r+EbHPaXxDZSjSfAOGAu8IlllWdD1esT499X5AXAVsrlM6AtULeanj0MfCng/1dgSGFBbhB9mv6PlsFvwNCId656JUigBr+RxUV3X/G9gDm0lt3AVYE61WznLUEN04uLqr0hE3RqsBVMD9TWTQ9YUiwtbPAL2Dv7nGJ5LaSReqHxvLCGtO0pCfRgI92wvawPHeGBJxAmqxLALZ5zbV+2hI7wwP0UQFY19PxUaoS/PND3XaZ9zVSyqiE49VsU6Hd85OLDi6xK6FWX1BM1OsDv6Zbk015MmUcvsiqhp3sSbFLHYQP8rnDYU1PQUSmCsioBvIwMTwf4HOh4Zagl8zBdNpqsKui5qzrtKcG5AX7HWOx8q14rDWWjyaoCcDYyrA/0+4DF1jlNZaPJqgIwBRmmBPo1bTWpLOPBTWWjyaoCsJx0dtr2HwNz5CtyykaTVQGdJZNILr0Z4VvtV+YxK6dsNFkV0HtsEowN9Ns35DB4irCsCgAzkEnq9wr0e6HF3j4bBIn6/ve+LwVgJeksEVwg/Z6XVk3Ud21WNpbT7yF0Nc55Pf0+YrD1jqF8Ch9mZSO4y7IyMMFv2kGZmVP2BAF9w7MyAb5AjgkBfk2nO8fllB0roG15ViYeSZ3QhFJfT795t1bJ2yzwON4lnh4QB5iPLPMS7h/+ZBgI1XU7F397lHk1Kwvg8YAg+uSFdwMXSd2o1ccjujx8XuexeaB2fk4pLJiOBk/0CN57wKXq9KXpikbOpmx3jxVpu36yN5ruiOtTqS5W6rIveJR9rsh42hqsDgm6GBSxgTpVSN+9Hr7u0GUH6Hm46xUTlJMRQQ0QHg05pil3vdSjjpo2Hiugb7HDT1fjAOyZiZyRqiumIf09hA1oqtOmDyy6eExA348OH6/nXKf41FFnq9RZ8JCGqCf0L4ew/obD5p2OehsStQ3GTV4CaqRHvXtStBW1aDnashW1x1Jve6Kumxy6Ok3XitWT7qi7JkVbUYuWvhGfZPiXgg/0zLfUHeKYW3vdHW/1osX4PgPOs1VM1PWRQ9coR/05RWkratFyuOMiu5EETX0cd1I2e8zVb6taoF2LljbHaVQjCZouwc5cDxsji9AWje3ipcZ69BbL7CNB030OTRenHqPIKrhosX4wBPiqgEDbrhZ/45P7BvpVLdCuRYt1PxDLlxAS5va2nZ9HJdYIWavRgmwnOl1fEHhDONBDsXNWgC3x3lbkosV6OhR4UTjQ6vaBiXWBtt6tWqBti5ZujrozhQP9rNQdbn1ZqVKBnh97LgKYKhxolc/OQy33Bwfami2prdBFi0fdW6UaozODps2FVRH2plUt0BNjv60BXCkY6BEmW8CdEfZurlqgTYuWXR51zxcM9IOW/cp+EfaGVy3QpkXLTo+6JwkG2nT/e1lku06tWqBNi5YdngmgXCJ0qCMHedwY2a42KW1iGO6xdLTy+9Tk29mW8jGTsr6dHXrWYkbRdYuwU7TNJJrOWgR9j5+EuhY7m/QlfGveuVXaampqampqampqampqsv2BfwCq7DcXhQ+dtAAAAABJRU5ErkJggg==" />
//             </defs>
//         </svg>
//     )
// }

// export default Events   