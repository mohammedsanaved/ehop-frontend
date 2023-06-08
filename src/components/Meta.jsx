import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'ESHOP',
  description:
    'the updated version of proshop was created by www.github/mohammedsanaved.com',
  keywords:
    'mohammedsanaved, eshop ecommerce, ESHOP, EShop, github mohammed sanaved, mohammed sanaved',
};

export default Meta;
