import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Link } from '../models/link';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

const Links = (props: any) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  const { id: user_id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users/${user_id}/links`);

      setLinks(data);
    })();
  }, [user_id]);
  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page * perPage, (page + 1) * perPage).map((link) => {
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>
                  {link.orders.reduce((s, o) => s + o.total, 0)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={links.length}
            page={page}
            rowsPerPage={perPage}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPageOptions={[-1]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Links;
