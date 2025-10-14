interface SearchPostPageProps {
searchParams: {searchText:string}
}

const SearchPostPage = ({searchParams}: SearchPostPageProps) => {
  return (
    <section className='fix-height container m-auto px-5'>
      <h1>Search Post Page</h1>
      <h1>Search Text is : {searchParams.searchText}</h1>
    </section>
  );
};

export default SearchPostPage;
