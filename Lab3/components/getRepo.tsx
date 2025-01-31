import React, { useState, useEffect } from 'react';

interface GetRepoProps {
    language?: string;
    sort?: string;
    order?: string;
    perPage?: number;
    onFetchRepos: (repos: any[]) => void;
  }

export function GetRepo({language , sort, order, perPage, onFetchRepos}: GetRepoProps) {

  useEffect(() => {
    if (!language || !sort || !order || !perPage) return; // Avoid fetching if any parameter is missing

    const fetchRepos = async () => {
        try{
        const url = `https://api.github.com/search/repositories?q=language:${language}&sort=${sort}&order=${order}&per_page=${perPage}`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.items){
            onFetchRepos(data.items)
        } else {
            console.error("Failed to fetch: ", data)
        }

        } catch (error){
            console.log("Error fetching: ", error)
        }
    };
    console.log(language, sort, order, perPage)
    fetchRepos();
  }, [language, sort, order, perPage]);

  return null;
}