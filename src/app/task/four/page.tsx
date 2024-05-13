/**
 * The .js, .jsx, or .tsx file extensions can be used for Pages.
 * A page is always the leaf of the route subtree.
 * A page.js file is required to make a route segment publicly accessible.
 * Pages are Server Components by default, but can be set to a Client Component.
 * Pages can fetch data. View the Data Fetching section for more information.
 * @constructor
 */
export default function Page() {
    return <p>Dashboard Page</p>;
}
