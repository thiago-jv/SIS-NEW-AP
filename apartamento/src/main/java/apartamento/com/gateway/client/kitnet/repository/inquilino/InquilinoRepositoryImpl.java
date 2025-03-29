package apartamento.com.gateway.client.kitnet.repository.inquilino;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.core.entity.Inquilino;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class InquilinoRepositoryImpl implements InquilinoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Inquilino> filter(InquilinoFilter inquilinoFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Inquilino> criteria = builder.createQuery(Inquilino.class);
		Root<Inquilino> root = criteria.from(Inquilino.class);

		criteria.orderBy(builder.asc(root.get("id")));

		Predicate[] predicates = criarRestricoes(inquilinoFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Inquilino> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		List<Inquilino> inquilinos = query.getResultList();

		return new PageImpl<>(inquilinos, pageable, total(inquilinoFilter));
	}


	private Predicate[] criarRestricoes(InquilinoFilter inquilinoFilter, CriteriaBuilder builder,
			Root<Inquilino> root) {
		List<Predicate> predicates = new ArrayList<>();

        if (!Objects.isNull(inquilinoFilter.cpf())) {
			
        	predicates.add(builder.equal((root.get("cpf")), inquilinoFilter.cpf()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}
	
	private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}
	
	private Long total(InquilinoFilter inquilinoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Inquilino> root = criteria.from(Inquilino.class);

		Predicate[] predicates = criarRestricoes(inquilinoFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

}
