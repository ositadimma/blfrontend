
import React from 'react';

const LoanOptions = ({ accounts, value, onChange, field }) => {
    const handleChange = (event) => {
        onChange(field, event.target.value); // Pass field name and value to the parent handler
      };
console.log(accounts)
  return (

    <div>
    <select
        id="account"
            name="account"
            value={value}
            onChange={handleChange}
            style={{ margin: '10px', padding: '5px' }}
        >
        <option value="" disabled>
        -- Select an Option --
        </option>
        {accounts.map((account)=>(
            <option value={account.accountId}>{account.accountId}</option>
        ))}
        </select> 
    </div>
  );
};

export default LoanOptions;