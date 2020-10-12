import React from 'react';
import Layout from './shared/Layout';
import Link from './shared/Link';

export default function DonatePage() {
  return (
    <Layout meta={{ title: 'Donate' }}>
      <h1>Donate</h1>

      <p>
        If you found any of my projects useful and want to support their development, please
        consider making a donation 🙂
      </p>

      <ul>
        <li>
          <Link href="https://patreon.com/Tyrrrz">Patreon</Link> (recurring)
        </li>
        <li>
          <Link href="https://buymeacoffee.com/Tyrrrz">BuyMeACoffee</Link> (one-time)
        </li>
        <li>
          Ethereum: <code>0x00E6B59BAD5F0c887E0eBD1b7bBd7b024d0796c9</code>
        </li>
      </ul>

      <p>Top supporters:</p>

      <ul>
        <li>Peter Wesselius</li>
        <li>Mark Ledwich</li>
        <li>Thomas C</li>
        <li>BouncingWalrus</li>
        <li>Dominic Maas</li>
        <li>Victor Smith</li>
        <li>A dude</li>
        <li>Greg Engle</li>
        <li>Samuel Morris</li>
        <li>lupus</li>
        <li>Richard</li>
        <li>Foritus</li>
        <li>Vince</li>
        <li>Michael Dayah</li>
        <li>Sprocketman1981</li>
        <li>Jim Wilson</li>
      </ul>
    </Layout>
  );
}
